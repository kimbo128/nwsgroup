export interface Location {
  id?: string
  name: string
  address: string
  zip?: string
  city?: string
  phone: string
  whatsapp: string
  email: string
  hours: {
    weekdays: string
    saturday?: string
    sunday?: string
  }
  coordinates: [number, number] // [lat, lng]
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  link: string
}

export interface ContactButton {
  type: 'phone' | 'whatsapp' | 'telegram'
  label: string
  url: string
  icon: string
}

