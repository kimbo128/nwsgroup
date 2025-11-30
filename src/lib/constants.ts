import { Location, Service } from '@/types'

export const LOCATIONS: Location[] = [
  {
    name: 'Pratteln',
    address: 'Hauptstrasse 123, 4133 Pratteln',
    phone: '+41618219292',
    whatsapp: '+41618219292',
    email: 'pratteln@nwsgroup.ch',
    hours: {
      weekdays: 'Mo-Sa: 08:00 - 18:00',
      saturday: 'Sa: 08:00 - 16:00',
    },
    coordinates: [47.5207, 7.6936],
  },
  {
    name: 'Dornach',
    address: 'Bahnhofstrasse 45, 4143 Dornach',
    phone: '+41618219595',
    whatsapp: '+41618219595',
    email: 'dornach@nwsgroup.ch',
    hours: {
      weekdays: 'Mo-Fr: 08:00 - 18:00',
    },
    coordinates: [47.4806, 7.6164],
  },
]

export const SERVICES: Service[] = [
  {
    id: 'ankauf',
    title: 'Ankauf von Autos',
    description: 'Wir kaufen Autos aller Marken und Modelle zu fairen Preisen.',
    icon: 'Car',
    link: '/dienstleistungen#ankauf',
  },
  {
    id: 'verkauf',
    title: 'Gebrauchtwagenverkauf',
    description: 'Geprüfte Fahrzeuge in bester Qualität zu attraktiven Preisen.',
    icon: 'ShoppingCart',
    link: '/dienstleistungen#verkauf',
  },
  {
    id: 'karosserie',
    title: 'Karosseriearbeiten',
    description: 'Professionelle Reparaturen und Lackierarbeiten für Ihr Fahrzeug.',
    icon: 'Wrench',
    link: '/dienstleistungen#karosserie',
  },
  {
    id: 'beratung',
    title: 'Persönliche Beratung',
    description: 'Individuelle Beratung für Ihre individuellen Bedürfnisse.',
    icon: 'Users',
    link: '/dienstleistungen#beratung',
  },
]

export const CONTACT_PHONE = '061 821 92 92'
export const WHATSAPP_GENERAL = '+41795511245'
export const TELEGRAM_BOT_URL = 'https://t.me/NWSGroupBot'
export const AUTOSCOUT24_URL = 'https://www.autoscout24.ch/de/s/seller-2328369'

