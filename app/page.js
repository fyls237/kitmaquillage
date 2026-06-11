import styles from "./page.module.css";

const kitFeatures = [
  "12 essentiels maquillage faciles à utiliser",
  "Guide pas à pas pour débutantes",
  "Teintes polyvalentes pour le quotidien",
];

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <p className={styles.badge}>Kit Maquillage Débutante</p>
        <h1>Crée ton premier look avec confiance</h1>
        <p className={styles.description}>
          Une sélection simple et complète pour apprendre le maquillage sans se
          tromper.
        </p>
        <div className={styles.priceBlock}>
          <span className={styles.price}>39,90 €</span>
          <span className={styles.shipping}>Livraison offerte dès 60 €</span>
        </div>
        <a className={styles.cta} href="#acheter">
          Acheter le kit
        </a>
      </section>

      <section id="acheter" className={styles.features}>
        <h2>Ce que contient le kit</h2>
        <ul>
          {kitFeatures.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
