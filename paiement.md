---
title: "Acces Premium - Global Study"
layout: "paiement"
---

<div class="paiement-container">
  <div class="paiement-header">
    <h1>Debloquez l'acces complet a Global Study</h1>
    <p>Bourses, visas, emplois, logements et ressources exclusives pour seulement <strong>15 EUR</strong>.</p>
  </div>
  <div class="paiement-options">
    <div class="option-card fedapay">
      <h2>Paiement pour l'Afrique</h2>
      <p>Mobile Money, Carte Bancaire (FedaPay)</p>
      <div class="price">15 EUR</div>
      <button id="fedapay-btn" class="btn-payer">Payer avec FedaPay</button>
      <p class="note">Paiement securise. Acces immediat apres confirmation.</p>
    </div>
    <div class="option-card crypto">
      <h2>Paiement International</h2>
      <p>USDT (BEP20) - Accepte partout dans le monde</p>
      <div class="price">15 USDT</div>
      <div class="crypto-details">
        <p>Envoyez exactement <strong>15 USDT</strong> a l'adresse :</p>
        <div class="address-box">
          <code id="usdt-address">0x395df0b6add75e86074cd8032a1d6ff293309e20</code>
          <button id="copy-address" onclick="copyAddress()">Copier</button>
        </div>
        <div class="qr-code">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=0x395df0b6add75e86074cd8032a1d6ff293309e20" alt="QR Code USDT">
        </div>
        <p class="warning">Apres avoir envoye le montant, contactez-nous sur WhatsApp avec la preuve de transaction.</p>
        <a href="https://wa.me/33753883652?text=Bonjour%2C%20je%20viens%20d'effectuer%20un%20paiement%20USDT%20pour%20Global%20Study." class="whatsapp-btn" target="_blank">Signaler le paiement sur WhatsApp</a>
      </div>
    </div>
  </div>
  <div class="paiement-footer">
    <p>Une fois l'acces debloque, vous pourrez consulter :</p>
    <ul>
      <li>Toutes les fiches pays detaillees (visa, universites)</li>
      <li>Liste des bourses actualisees en temps reel</li>
      <li>Offres d'emploi ciblees pour les Africains</li>
      <li>Ressources pour l'apprentissage des langues</li>
      <li>Guides et ebooks exclusifs</li>
    </ul>
    <p>Des questions ? <a href="https://wa.me/33753883652">Contactez-nous sur WhatsApp</a></p>
  </div>
</div>

<script src="https://cdn.fedapay.com/checkout.js?v=1.1.5"></script>
<script>
function copyAddress() {
  var address = document.getElementById('usdt-address').innerText;
  navigator.clipboard.writeText(address).then(function() { alert('Adresse USDT copiee !'); });
}
document.getElementById('fedapay-btn').addEventListener('click', function() {
  var userEmail = prompt("Veuillez entrer votre adresse email :");
  if (!userEmail) { alert("L'adresse email est necessaire."); return; }
  FedaPay.init({
    public_key: 'pk_live_JzLYCSq5xIEjJxu1UAuRe0Gh',
    transaction: {
      amount: 15,
      currency: { iso: 'EUR' },
      description: 'Acces Global Study - Abonnement Premium',
      callback_url: 'https://votresite.netlify.app/confirmation-paiement'
    },
    customer: { email: userEmail, firstname: '', lastname: '' },
    onClose: function() { console.log('Fenetre fermee'); }
  });
  FedaPay.open();
});
</script>

<style>
.paiement-container { max-width: 1200px; margin: 2rem auto; padding: 0 1.5rem; color: #e0e0e0; }
.paiement-header { text-align: center; margin-bottom: 3rem; }
.paiement-header h1 { font-size: 2.5rem; color: white; }
.paiement-options { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 3rem; }
.option-card { background: #151e2f; border-radius: 20px; padding: 2rem; text-align: center; border: 1px solid #2e3f5a; box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
.option-card h2 { color: white; margin-top: 0; }
.price { font-size: 3rem; font-weight: bold; color: #3b82f6; margin: 1rem 0; }
.btn-payer { background: #3b82f6; color: white; border: none; padding: 1rem 2rem; font-size: 1.2rem; border-radius: 50px; cursor: pointer; font-weight: bold; width: 100%; transition: background 0.3s; margin: 1.5rem 0; }
.btn-payer:hover { background: #2563eb; }
.address-box { background: #0a0f1e; padding: 1rem; border-radius: 10px; display: flex; align-items: center; justify-content: space-between; margin: 1.5rem 0; word-break: break-all; }
.address-box code { font-size: 0.9rem; color: #a0c4ff; }
.address-box button { background: #2e3f5a; color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; margin-left: 1rem; }
.qr-code { margin: 1.5rem 0; }
.qr-code img { border-radius: 10px; background: white; padding: 10px; }
.whatsapp-btn { display: inline-block; background: #25D366; color: white; padding: 0.8rem 1.5rem; border-radius: 50px; text-decoration: none; font-weight: bold; margin-top: 1.5rem; }
.warning { color: #fbbf24; font-size: 0.9rem; }
.note { font-size: 0.9rem; color: #9ca3af; }
.paiement-footer { background: #151e2f; border-radius: 20px; padding: 2rem; text-align: center; border: 1px solid #2e3f5a; }
.paiement-footer ul { list-style: none; padding: 0; display: inline-block; text-align: left; }
.paiement-footer li { margin: 0.5rem 0; }
@media (max-width: 768px) { .paiement-options { grid-template-columns: 1fr; } }
</style>
