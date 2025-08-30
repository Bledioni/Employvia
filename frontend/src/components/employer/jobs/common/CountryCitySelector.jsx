import React, { useState } from "react";

function CountryCitySelector({ country, setCountry, city, setCity }) {
    const countriesData = {
        "Albania": ["Tirana", "Durrës", "Shkodër", "Fier", "Vlorë"],
        "Andorra": ["Andorra la Vella", "Escaldes-Engordany", "Encamp", "Sant Julià de Lòria", "Escaldes-Engordany"],
        "Armenia": ["Yerevan", "Gyumri", "Vanadzor", "Vagharshapat", "Vayk"],
        "Austria": ["Vienna", "Graz", "Linz", "Salzburg", "Innsbruck"],
        "Azerbaijan": ["Baku", "Ganja", "Mingachevir", "Sumqayit", "Mingachevir"],
        "Belarus": ["Minsk", "Gomel", "Mogilev", "Vitebsk", "Grodno"],
        "Belgium": ["Brussels", "Antwerp", "Ghent", "Charleroi", "Liège"],
        "Bosnia and Herzegovina": ["Sarajevo", "Banja Luka", "Tuzla", "Zenica", "Mostar"],
        "Bulgaria": ["Sofia", "Plovdiv", "Varna", "Burgas", "Ruse"],
        "Croatia": ["Zagreb", "Split", "Rijeka", "Osijek", "Zadar"],
        "Cyprus": ["Nicosia", "Limassol", "Larnaca", "Famagusta", "Paphos"],
        "Czech Republic": ["Prague", "Brno", "Ostrava", "Plzeň", "Liberec"],
        "Denmark": ["Copenhagen", "Aarhus", "Odense", "Aalborg", "Esbjerg"],
        "Estonia": ["Tallinn", "Tartu", "Narva", "Pärnu", "Kohtla-Järve"],
        "Finland": ["Helsinki", "Espoo", "Tampere", "Vantaa", "Oulu"],
        "France": ["Paris", "Marseille", "Lyon", "Toulouse", "Nice"],
        "Georgia": ["Tbilisi", "Batumi", "Kutaisi", "Zugdidi", "Rustavi"],
        "Germany": ["Berlin", "Munich", "Hamburg", "Cologne", "Frankfurt"],
        "Greece": ["Athens", "Thessaloniki", "Patras", "Heraklion", "Larissa"],
        "Hungary": ["Budapest", "Debrecen", "Szeged", "Miskolc", "Pécs"],
        "Iceland": ["Reykjavik", "Akureyri", "Reykjanesbær", "Kopavogur", "Hafnarfjordur"],
        "Ireland": ["Dublin", "Cork", "Limerick", "Galway", "Waterford"],
        "Italy": ["Rome", "Milan", "Naples", "Turin", "Palermo"],
        "Kazakhstan": ["Almaty", "Astana", "Shymkent", "Karaganda", "Aktobe"],
        "Kosova": ["Prishtina", "Prizren", "Peja", "Mitrovica", "Gjakova"],
        "Latvia": ["Riga", "Jurmala", "Liepaja", "Jurmala", "Jurmala"],
        "Liechtenstein": ["Vaduz", "Schaan", "Balzers", "Eschen", "Balzers"],
        "Lithuania": ["Vilnius", "Kaunas", "Klaipeda", "Šiauliai", "Panevėžys"],
        "Luxembourg": ["Luxembourg City", "Ettelbruck", "Ettelbruck", "Ettelbruck", "Ettelbruck"],
        "Malta": ["Valletta", "Mosta", "Mellieħa", "Birkirkara", "Sliema"],
        "Moldova": ["Chisinau", "Bălți", "Bender", "Tighina", "Bălți"],
        "Monaco": ["Monaco", "Monte Carlo", "La Condamine", "Moneghetti", "Moneghetti"],
        "Montenegro": ["Podgorica", "Nikšić", "Herceg Novi", "Bijelo Polje", "Pljevlja"],
        "Netherlands": ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven"],
        "North Macedonia": ["Skopje", "Bitola", "Prilep", "Kumanovo", "Ohrid"],
        "Norway": ["Oslo", "Bergen", "Stavanger", "Drammen", "Dundas"],
        "Poland": ["Warsaw", "Kraków", "Łódź", "Wrocław", "Poznań"],
        "Portugal": ["Lisbon", "Porto", "Amadora", "Braga", "Coimbra"],
        "Romania": ["Bucharest", "Cluj-Napoca", "Timișoara", "Iași", "Constanța"],
        "Russia": ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Nizhny Novgorod"],
        "San Marino": ["San Marino", "Serravalle", "Borgo Maggiore", "Domagnano", "Fiorentino"],
        "Slovakia": ["Bratislava", "Košice", "Prešov", "Nitra", "Trnava"],
        "Slovenia": ["Ljubljana", "Maribor", "Celje", "Kranj", "Koper"],
        "Spain": ["Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza"],
        "Sweden": ["Stockholm", "Gothenburg", "Malmö", "Uppsala", "Västerås"],
        "Switzerland": ["Zurich", "Geneva", "Basel", "Bern", "Lucerne"],
        "Turkey": ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya"],
        "Ukraine": ["Kyiv", "Kharkiv", "Odesa", "Dnipro", "Lviv"],
        "United Kingdom": ["London", "Manchester", "Birmingham", "Leeds", "Glasgow"],
        "Vatican City": ["Vatican City"]
    };


    const [cities, setCities] = useState([]);

    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        setCountry(selectedCountry);
        setCities(countriesData[selectedCountry] || []);
        setCity(''); // reset city selection
    };

    return (
        <div className="country-city-container">
            <label>
                Country
                <select value={country} onChange={handleCountryChange} required>
                    <option value="">Select Country</option>
                    {Object.keys(countriesData).map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </label>

            <label>
                City
                <select value={city} onChange={(e) => setCity(e.target.value)} required>
                    <option value="">Select City</option>
                    {cities.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </label>
        </div>
    );
}

export default CountryCitySelector;
