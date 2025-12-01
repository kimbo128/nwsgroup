import { FadeIn } from "@/components/animations/fade-in"

export default function ImpressumPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <FadeIn>
        <h1 className="mb-8 text-4xl font-bold">Impressum</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>Angaben gemäß § 5 TMG</h2>
          <p>
            <strong>NWS Group AG</strong>
            <br />
            Hauptstrasse 123
            <br />
            4133 Pratteln
            <br />
            Schweiz
          </p>

          <h2>Kontakt</h2>
          <p>
            Telefon: 061 821 92 92
            <br />
            E-Mail: info@nwsgroup.ch
          </p>

          <h2>Registereintrag</h2>
          <p>
            Eintragung im Handelsregister.
            <br />
            Registergericht: [Registergericht]
            <br />
            Registernummer: [Registernummer]
          </p>

          <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>
            [Name des Verantwortlichen]
            <br />
            [Adresse]
          </p>
        </div>
      </FadeIn>
    </div>
  )
}



