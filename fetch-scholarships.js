const { ApifyClient } = require('apify-client');
const fs = require('fs');
const path = require('path');

const APIFY_TOKEN = process.env.APIFY_TOKEN;
const ACTOR_ID = 'mscraper/scholarships-competitions-internships-extractor';
const OUTPUT_DIR = path.join(__dirname, '..', 'content', 'bourses', 'auto');

if (!APIFY_TOKEN) {
  console.error('APIFY_TOKEN non defini.');
  process.exit(1);
}

const client = new ApifyClient({ token: APIFY_TOKEN });

function cleanOldScholarships() {
  if (fs.existsSync(OUTPUT_DIR)) {
    const files = fs.readdirSync(OUTPUT_DIR);
    for (const file of files) {
      if (file.endsWith('.md')) fs.unlinkSync(path.join(OUTPUT_DIR, file));
    }
  } else {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

function slugify(text) {
  return text.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function extractCountry(text) {
  const countries = ['France', 'Allemagne', 'Canada', 'USA', 'Royaume-Uni', 'Russie', 'Chine', 'Japon', 'Australie'];
  for (const country of countries) if (text.includes(country)) return country;
  return 'International';
}

function isExpired(deadlineStr) {
  if (!deadlineStr || deadlineStr === 'N/A') return false;
  try { return new Date(deadlineStr) < new Date(); } catch { return false; }
}

function generateMarkdown(scholarship) {
  const title = scholarship.title || 'Bourse sans titre';
  const deadline = scholarship.deadline || 'N/A';
  const country = extractCountry(title + ' ' + (scholarship.description || ''));
  const provider = scholarship.provider || scholarship.organization || 'Non specifie';
  const amount = scholarship.amount || scholarship.value || 'Non specifie';
  const level = scholarship.level || scholarship.educationLevel || 'Tous niveaux';
  const link = scholarship.url || scholarship.link || '#';
  const description = scholarship.description || 'Aucune description.';

  if (isExpired(deadline)) return null;

  const safeTitle = title.replace(/"/g, '\\"');
  const content = `---
title: "${safeTitle}"
date: ${new Date().toISOString().split('T')[0]}
draft: false
type: "bourse"
pays: "${country}"
deadline: "${deadline}"
organisme: "${provider}"
montant: "${amount}"
niveau: "${level}"
lien: "${link}"
---

# ${title}

**Organisme :** ${provider}
**Montant :** ${amount}
**Niveau :** ${level}
**Date limite :** ${deadline}
**Pays :** ${country}

## Description
${description}

## Postuler
[Acceder a l'offre officielle](${link})

---
*Bourse importee automatiquement.*
`;
  return { slug: slugify(title), content };
}

(async () => {
  console.log('Mise a jour des bourses...');
  cleanOldScholarships();

  const actorClient = client.actor(ACTOR_ID);
  const runs = await actorClient.runs().list({ limit: 5, status: 'SUCCEEDED' });

  if (runs.items.length === 0) {
    console.log('Aucun run recent, lancement...');
    await actorClient.call();
    await new Promise(r => setTimeout(r, 30000));
  }

  const lastRun = runs.items[0];
  const { items } = await client.dataset(lastRun.defaultDatasetId).listItems();

  let created = 0;
  for (const item of items) {
    const result = generateMarkdown(item);
    if (result) {
      fs.writeFileSync(path.join(OUTPUT_DIR, result.slug + '.md'), result.content);
      created++;
    }
  }
  console.log(created + ' bourses publiees.');
})();
