type hikes = 'GranKoscielcow' | 'IslandPeak' | 'ViaFerraty'
type windsurfing = 'Karpathos' | 'Lanzarote' | 'ElGouna' | 'Limnos' | 'Sal' | 'Sotavento'
type yoga = 'Japonia' | 'Wlochy' | 'Hiszpania' | 'Portugalia' | 'Malta'
type other = 'Mazury'

enum TripName {
    WspinaczkaGranKoscielcow = "Grań Kościelców",
    WspinaczkaIslandPeak = 'Wspinaczka Island Peak',
    WspinaczkaViaFerraty = 'Wspinaczka Via Ferraty',
    WindsurfingKarpathos = 'Windsurfing w Karpathos',
    WindsurfingSotavento = 'Fuerteventura - Sotavento',
    WindsurfingLanzarote = 'Windsurfing w Lanzarote (Costa Teguise)',
    WindsurfingLimnos = 'Grecja - Limnos',
    WindsurfingElGouna = 'Egipt - El Gouna',
    WindsurfingSal = 'Wyspy Zielonego Przylądka - Sal',
    YogaJaponia = 'Wakacje z yogą w Kraju Kwitnącej Wiśni',
    YogaWlochy = 'Wczasy relaksacyjne z yogą w Toskanii',
    YogaHiszpania = 'Yoga i pilates w Hiszpanii',
    YogaPortugalia = 'Yoga i pilates w Portugalii',
    YogaMalta = 'Zmień swoją sylwetkę! Yoga na Malcie',
    KursMazury = 'Kurs żeglarski na Mazurach',
}

export interface Trip {
    name: TripName
}

export const hikes: Record<hikes, Trip> = {
    GranKoscielcow: { name: TripName.WspinaczkaGranKoscielcow },
    IslandPeak: { name: TripName.WspinaczkaIslandPeak },
    ViaFerraty: { name: TripName.WspinaczkaViaFerraty },
};

export const windsurfing: Record<windsurfing, Trip> = {
    Karpathos: { name: TripName.WindsurfingKarpathos },
    Lanzarote: { name: TripName.WindsurfingLanzarote },
    ElGouna: { name: TripName.WindsurfingElGouna },
    Limnos: { name: TripName.WindsurfingLimnos },
    Sal: { name: TripName.WindsurfingSal },
    Sotavento: { name: TripName.WindsurfingSotavento }
};

export const yoga: Record<yoga, Trip> = {
    Japonia: { name: TripName.YogaJaponia },
    Wlochy: { name: TripName.YogaWlochy },
    Hiszpania: { name: TripName.YogaHiszpania },
    Portugalia: { name: TripName.YogaPortugalia },
    Malta: { name: TripName.YogaMalta },
}

export const other: Record<other, Trip> = {
    Mazury: { name: TripName.KursMazury },
}

