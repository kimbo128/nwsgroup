import { FadeIn } from "@/components/animations/fade-in"

export default function DatenschutzPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <FadeIn>
        <h1 className="mb-8 text-4xl font-bold">Datenschutzerklärung</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>1. Datenschutz auf einen Blick</h2>
          
          <h3>Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
            personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
            Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>

          <h3>Datenerfassung auf dieser Website</h3>
          <p>
            <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
            <br />
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
            Kontaktdaten können Sie dem Abschnitt &ldquo;Hinweis zur Verantwortlichen Stelle&rdquo; in dieser
            Datenschutzerklärung entnehmen.
          </p>

          <h2>2. Hosting</h2>
          <p>
            Diese Website wird bei Railway gehostet. Anbieter ist Railway Inc. (siehe
            https://railway.app). Wenn Sie diese Website besuchen, erfasst Railway verschiedene
            Logfiles inklusive Ihrer IP-Adressen.
          </p>

          <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
          
          <h3>Datenschutz</h3>
          <p>
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir
            behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen
            Datenschutzbestimmungen sowie dieser Datenschutzerklärung.
          </p>

          <h3>Hinweis zur verantwortlichen Stelle</h3>
          <p>
            Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
            <br />
            <br />
            NWS Group AG
            <br />
            Hauptstrasse 123
            <br />
            4133 Pratteln
            <br />
            Schweiz
            <br />
            <br />
            Telefon: 061 821 92 92
            <br />
            E-Mail: info@nwsgroup.ch
          </p>

          <h2>4. Datenerfassung auf dieser Website</h2>
          
          <h3>Kontaktformular</h3>
          <p>
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus
            dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks
            Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
          </p>

          <h3>Registrierung auf dieser Website</h3>
          <p>
            Sie können sich auf dieser Website registrieren, um zusätzliche Funktionen auf der
            Seite zu nutzen. Die dazu eingegebenen Daten verwenden wir nur zum Zwecke der Nutzung
            des jeweiligen Angebotes oder Dienstes, für den Sie sich registriert haben.
          </p>
        </div>
      </FadeIn>
    </div>
  )
}

