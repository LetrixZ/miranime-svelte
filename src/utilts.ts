export interface AnimeItem {
  idMal: number;
  title: string;
  synopsis: string;
  poster: string;
  banner: string;
  year: number;
  season: string;
  synonyms: string[];
  genres: string[];
  trailer: string;
  episodes:number,
  sites: Site[]
}

interface Site {
  slug: string,
  source: string
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export const genres = {
  'action': 'Acción', 'adventure': 'Aventuras', 'drama': 'Drama',
  'sci-fi': 'Ciencia Ficción', 'mystery': 'Misterio', 'comedy': 'Comedia',
  'supernatural': 'Sobrenatural', 'fantasy': 'Fantasía', 'sports': 'Deportes',
  'slice-of-life': "Recuentos de la Vida", 'horror': 'Terror', 'psychological': 'Psicológico',
  'thriller': 'Suspenso', 'romance': "Romance", 'ecchi': 'Ecchi',
  'mecha': 'Mecha', 'music': 'Música', 'mahou-shoujo': 'Chicas Mágicas',
  'hentai': 'Hentai', 'shounen': "Shounen", 'super-power': 'Super Poderes',
  'magic': 'Magia', 'parody': 'Parodía', 'vampire': 'Vampiros',
  'historical': 'Histórico', 'kids': 'Niños', 'shoujo': 'Shoujo',
  'martial-arts': 'Artes Marciales', 'samurai': 'Samurais', 'game': 'Juegos',
  'josei': 'Josei', 'dementia': 'Demencia', 'school': 'Escolar',
  'military': 'Militar', 'harem': 'Harem', 'seinen': 'Seinen'
}

export const seasons = {
  'SUMMER': 'Verano', 'WINTER': 'Invierno', 'FALL': 'Otoño', 'SPRING': 'Primavera'
}

export const makeRequest = async (type: string, params = {}) => {
  let url = "http://192.168.1.40:4000/";
  switch (type) {
    case 'ONGOINGS':
      url = url + 'ongoings'
      break;
    case 'GENRE':
      url = url + 'genre?' + new URLSearchParams(params)
      break;
    case 'GENRES':
      url = url + 'genres'
      break;
    case 'ITEM':
      url = url + params['idMal'];
      break;
    case 'SEARCH':
      url = url + 's?' + new URLSearchParams(params)
  }
  await new Promise((r) => setTimeout(r, 0));
  const res = await fetch(url);
  if (res.ok) {
    return await res.json();
  } else {
    console.log(res);
    throw new Error("Request error");
  }
}

export const getSite = ({ source, slug }, episode) => {
  switch (source) {
    case 'OtakusTV':
      if (episode) return `https://www.otakustv.com/anime/${slug}/episodio-${episode}`
      return `https://www.otakustv.com/anime/${slug}`
    case 'JkAnime':
      if (episode) return `https://jkanime.net/${slug}/${episode}`
      return `https://jkanime.net/${slug}`
    case 'MonosChinos':
      if (episode) {
        slug = slug.replace('-sub-espanol', '')
        return `https://monoschinos2.com/ver/${slug}-episodio-${episode}`}
      return `https://monoschinos2.com/anime/${slug}`
    case 'TioAnime':
      if (episode) return `https://tioanime.com/ver/${slug}-${episode}`
      return `https://tioanime.com/anime/${slug}`
    case 'AnimeID':
      if (episode) return `https://www.animeid.tv/v/${slug}-${episode}`
      return `https://www.animeid.tv/${slug}`
  }
}

// export const items: Array<AnimeItem> = [
//   {
//     id: 40060,
//     title: "BNA",
//     cover: "https://cdn.myanimelist.net/images/anime/1139/106986.jpg",
//   },
//   {
//     id: 45576,
//     title: "Mushoku Tensei: Isekai Ittara Honki Dasu Part 2",
//     cover: "https://cdn.myanimelist.net/images/anime/1028/117777.jpg",
//   },
//   {
//     id: 48926,
//     title: "Komi-san wa, Comyushou desu.",
//     cover: "https://cdn.myanimelist.net/images/anime/1899/117237.jpg",
//   },
//   {
//     id: 47398,
//     title: "Kimetsu Gakuen: Valentine-hen",
//     cover: "https://cdn.myanimelist.net/images/anime/1167/111666.jpg",
//   },
//   {
//     id: 44961,
//     title: "Platinum End",
//     cover: "https://cdn.myanimelist.net/images/anime/1992/116576.jpg",
//   },
//   {
//     id: 48556,
//     title: "Takt Op. Destiny",
//     cover: "https://cdn.myanimelist.net/images/anime/1449/117797.jpg",
//   },
//   {
//     id: 48483,
//     title: "Mieruko-chan",
//     cover: "https://cdn.myanimelist.net/images/anime/1277/117155.jpg",
//   },
//   {
//     id: 46352,
//     title: "Blue Period",
//     cover: "https://cdn.myanimelist.net/images/anime/1757/116931.jpg",
//   },
//   {
//     id: 44387,
//     title: "Sankaku Mado no Sotogawa wa Yoru",
//     cover: "https://cdn.myanimelist.net/images/anime/1869/118766.jpg",
//   },
//   {
//     id: 48761,
//     title: "Saihate no Paladin",
//     cover: "https://cdn.myanimelist.net/images/anime/1176/118382.jpg",
//   },
//   {
//     id: 49738,
//     title: "Heike Monogatari",
//     cover: "https://cdn.myanimelist.net/images/anime/1583/117719.jpg",
//   },
//   {
//     id: 42351,
//     title: "Senpai ga Uzai Kouhai no Hanashi",
//     cover: "https://cdn.myanimelist.net/images/anime/1619/118820.jpg",
//   },
//   {
//     id: 44940,
//     title: "World Trigger 3rd Season",
//     cover: "https://cdn.myanimelist.net/images/anime/1617/117474.jpg",
//   },
//   {
//     id: 33737,
//     title: "Megaton-kyuu Musashi",
//     cover: "https://cdn.myanimelist.net/images/anime/1317/116693.jpg"
//   }
// ];

export const getLipsum = () => {
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu neque lobortis, aliquam lacus nec, ultricies lectus. Ut aliquam placerat nunc, vitae porta leo tristique ut. Donec pulvinar tempor posuere. Integer pretium nibh vitae dolor convallis, eget consectetur dolor sagittis. Suspendisse vel egestas diam. Morbi egestas libero mauris, elementum egestas enim pharetra at. Nunc fermentum, dui non malesuada porta, velit mauris faucibus justo, in porttitor eros erat nec ipsum. Curabitur ultricies mollis augue a viverra.\nMauris in nulla interdum sapien cursus vehicula.Cras arcu lectus, imperdiet efficitur ullamcorper eu, rutrum nec nibh.Fusce sed risus eget odio placerat ultrices.Quisque euismod, ex in porta faucibus, dui est pharetra nisi, et consectetur diam nunc a lorem.Sed dictum massa finibus orci ultrices finibus.Vivamus sagittis eu justo sed rutrum.Vivamus nulla dui, aliquam non ultrices sit amet, consequat rhoncus lorem.Ut ornare, ante et hendrerit condimentum, enim tellus rutrum ex, sit amet fermentum augue enim at quam.Aenean at nisi gravida erat faucibus tempus.Integer sit amet risus laoreet, lacinia quam ut, commodo diam.Fusce eget pulvinar ligula, id dictum velit.Vestibulum pellentesque enim velit, sed pulvinar tellus vulputate non.In ullamcorper diam a congue egestas.Aenean cursus tincidunt turpis, et imperdiet velit rutrum sit amet.Praesent eu molestie ligula.\nEtiam pulvinar ipsum lorem.Pellentesque dui massa, luctus eu ornare quis, eleifend non ante.Nullam finibus dignissim nulla, eu aliquam neque porttitor ac.Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.Donec tristique velit tempus, aliquet mauris nec, efficitur tellus.Sed hendrerit eleifend vestibulum.Aenean ultricies lobortis eros, in consectetur arcu dictum id.Donec tempor sem fringilla auctor fringilla.Proin ullamcorper sapien sit amet feugiat elementum.Curabitur lacinia ex sed leo sollicitudin aliquet.Phasellus laoreet neque vitae congue tempus.\nInterdum et malesuada fames ac ante ipsum primis in faucibus.Aenean in sapien dolor.Quisque id magna faucibus, tempus justo eu, pretium diam.Mauris turpis sem, dictum eu nisi eu, mattis interdum dolor.Fusce ut pretium nunc, ac tincidunt ante.Sed ullamcorper, erat vel tincidunt lobortis, orci odio egestas purus, in ullamcorper dolor diam eget est.Mauris aliquet est turpis, vel ullamcorper sem malesuada sed.Mauris vel efficitur lorem, sed interdum mauris.Morbi tempor varius urna.Integer nec metus lacinia, vehicula est at, tincidunt sapien.Integer lobortis scelerisque dictum.Duis congue a justo ac sodales.\nEtiam lobortis, dolor vel convallis aliquet, felis leo pulvinar eros, accumsan ultrices felis leo lobortis justo.Duis maximus feugiat lectus, ut blandit felis tincidunt non.Morbi cursus nunc lorem, sed egestas eros ornare non.Quisque justo odio, dictum consequat sapien in, rutrum accumsan ipsum.Nullam dictum aliquet massa dapibus congue.Donec vel orci ultricies, pharetra velit et, vestibulum nisl.Curabitur pulvinar scelerisque felis ac hendrerit.Quisque et felis nec eros accumsan accumsan non vel magna.Vivamus sollicitudin vel odio sed interdum.\nMaecenas maximus maximus rhoncus.Aliquam eleifend est vel viverra euismod.Phasellus diam enim, varius ut tincidunt sit amet, auctor vitae ante.Proin rhoncus ultricies mi nec euismod.Suspendisse ut tortor ac libero posuere dignissim vitae ut purus.Cras scelerisque urna sit amet nibh tincidunt, sed ornare turpis rhoncus.Pellentesque sed vestibulum leo, eu vestibulum sapien.Sed efficitur a risus non luctus.Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Vivamus quis nibh quis elit blandit sollicitudin in eget arcu.\nUt dictum felis eu est rhoncus cursus.Nulla non risus pharetra, consectetur ante in, condimentum lacus.Proin interdum elit risus, a consequat nisi faucibus et.Nulla blandit ante ut massa consequat, et tincidunt libero dapibus.Sed sit amet nunc vitae diam rhoncus dignissim.Maecenas at elementum erat.Duis sem neque, bibendum vitae auctor ac, pulvinar sed libero.Curabitur id consequat mauris.Fusce vestibulum, dolor finibus volutpat venenatis, enim diam viverra erat, ut tempor ex risus in turpis.Integer et nibh porttitor, viverra orci vitae, tincidunt justo.\nSed sagittis volutpat erat, molestie accumsan nisl.Fusce diam ligula, bibendum in aliquet ut, finibus vitae diam.Maecenas maximus, orci eu ornare scelerisque, erat orci finibus urna, nec condimentum velit felis sit amet arcu.Suspendisse pharetra nulla faucibus, posuere leo ac, volutpat metus.Donec luctus orci non libero tempor, eu dapibus ante viverra.Cras eu maximus libero.Vivamus a volutpat quam, vitae egestas dui.Pellentesque est erat, pretium sed nisi ac, interdum bibendum purus.Nulla efficitur lobortis dui, at aliquam urna commodo sodales.Proin venenatis ipsum vel mauris semper, vitae placerat magna venenatis.Phasellus sed mi metus.Sed ut ex nisi.Sed felis lorem, commodo et aliquam eget, ornare ut ligula.\nCurabitur pharetra semper diam, vitae laoreet ante aliquet at.Quisque egestas sed nulla ut cursus.Pellentesque pharetra turpis a nisi consectetur dictum.Nullam neque quam, scelerisque vel leo et, bibendum finibus purus.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Pellentesque at aliquet leo.In ut massa malesuada, scelerisque turpis vel, porta nibh.Nullam posuere libero libero, ut tincidunt turpis sagittis et.\nVestibulum non blandit diam.Vestibulum ornare tellus at tortor blandit, et euismod ipsum pretium.Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Donec sit amet molestie sapien.Etiam sed ipsum diam.Nunc non ante mi.Sed non varius neque.Pellentesque ac turpis ut lectus euismod aliquam et ac mi.Aliquam fermentum porta urna, condimentum aliquet lacus rutrum id.\nVestibulum rutrum metus nisi, non scelerisque ante vulputate non.Vestibulum faucibus faucibus purus, in hendrerit orci interdum at.In et justo ut odio dapibus commodo vel quis tortor.Curabitur condimentum eu velit id dignissim.Sed porta, lorem eget pellentesque cursus, diam metus ultrices ipsum, sed iaculis nisl sapien ac nulla.Sed ullamcorper urna a libero vestibulum, a mattis tellus consectetur.In id varius enim, sit amet dapibus sem.Maecenas ut venenatis nunc.Vivamus a nisl id nisl scelerisque aliquet quis nec sem.Etiam congue arcu et dictum faucibus.Donec in consectetur turpis.Aenean sollicitudin consequat ante sed maximus.Aliquam mattis turpis id lectus mollis, at facilisis dolor fringilla.\nIn a ligula magna.In tempus urna arcu, id congue magna volutpat eu.Mauris felis arcu, tempor et ipsum placerat, efficitur viverra purus.Vestibulum lobortis felis sed orci faucibus, in vulputate ligula varius.Pellentesque mollis pretium mollis.Cras sit amet nisi nec augue egestas feugiat vel in odio.Donec finibus hendrerit ultricies.\nDonec sollicitudin arcu in ipsum pretium, vitae dignissim mauris molestie.Nunc sed sem eget massa tincidunt rutrum.Vestibulum ac quam nibh.Nunc tempor at leo tempus blandit.Nam non mattis mi.Vestibulum vel ante volutpat, ullamcorper enim sit amet, faucibus purus.Mauris ac sollicitudin mauris, eu fringilla massa.\nCras sit amet nisl vestibulum, sollicitudin mi at, interdum urna.Nam id volutpat ipsum.Curabitur turpis augue, dapibus non pulvinar quis, blandit sed risus.Nunc consequat, libero quis luctus tincidunt, nisi enim consectetur massa, sit amet mollis orci mauris sit amet justo.Mauris sed condimentum diam.Donec euismod ante at sollicitudin elementum.Pellentesque feugiat purus vel elit condimentum, id vehicula libero gravida.Aenean maximus felis et erat fringilla, ac porta enim blandit.Nullam in lacus odio.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In pulvinar et dolor vel auctor.Pellentesque vitae molestie nunc.Mauris vel hendrerit magna.\nCurabitur feugiat, turpis at vulputate maximus, leo ipsum porttitor elit, volutpat vestibulum nulla tortor id risus.Vivamus vitae quam id nibh condimentum vestibulum.Nam ac mi risus.Morbi varius tincidunt quam sed elementum.Vestibulum semper, ligula vel sodales feugiat, ex turpis feugiat sem, ac dapibus tellus erat at nulla.Maecenas ullamcorper eros eu est iaculis, nec efficitur massa laoreet.Suspendisse potenti.Donec vel sapien eu tellus gravida tincidunt.Praesent auctor elit eu felis elementum, eu fermentum purus egestas.Maecenas vehicula justo id dui interdum mattis.Integer tempus vel eros id cursus.Etiam ac malesuada metus.Cras ultricies, lacus ac aliquam interdum, elit lorem placerat enim, ut cursus quam mi ac diam.Donec vitae ligula ac justo euismod auctor.Aliquam pharetra rutrum rhoncus.\nNullam nec sodales orci.Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Praesent id lectus vel eros porttitor fringilla.Etiam nunc arcu, pellentesque quis ullamcorper volutpat, pellentesque vel tellus.Suspendisse ac libero nec erat ultricies mollis.Cras ac placerat nulla.Quisque a consequat sem.\nDonec in feugiat justo.Duis sodales purus auctor ante gravida dictum.Vivamus dignissim lorem lectus, nec laoreet urna euismod tristique.Donec sit amet fringilla orci, ut tempor mauris.Vestibulum eu massa id libero tempor ornare.In vel commodo dui, ac scelerisque neque.Sed nec congue orci.Curabitur vitae ornare quam, vitae accumsan arcu.Aliquam erat volutpat.Donec eu lacinia massa.Ut volutpat, risus et volutpat mattis, tellus dolor tristique mi, vitae faucibus turpis mi vel est.\nCurabitur purus lacus, interdum eleifend lorem at, finibus varius ipsum.Nam lacinia quam elit, vitae vehicula dui cursus et.Sed vel odio purus.Nam sollicitudin fringilla iaculis.Aenean et ipsum vestibulum, posuere justo at, sodales turpis.Integer aliquet vitae dolor quis pulvinar.Integer scelerisque, magna in fermentum porta, neque leo interdum ligula, eu finibus urna nunc et mauris.\nNullam quis sem ipsum.Duis imperdiet gravida massa non condimentum.Quisque vitae leo et justo dictum pellentesque.Donec sit amet mi non magna laoreet maximus vitae ut sapien.Suspendisse iaculis eget ante ac pulvinar.Suspendisse ut tristique elit.Duis vulputate turpis risus, sit amet ultricies ligula bibendum vitae.Duis porta pretium pellentesque.Proin fermentum maximus velit, sed scelerisque lectus convallis et.Etiam risus magna, consectetur sed mollis sit amet, dapibus vitae quam.Sed placerat eget nunc sed tempus.\nVivamus quam turpis, rutrum vel tellus a, venenatis dignissim diam.Mauris nec nulla mattis, volutpat nibh a, blandit elit.Nullam ac tortor eu sem accumsan vehicula malesuada luctus libero.Sed erat tellus, molestie at luctus eget, ullamcorper vitae sapien.Morbi pharetra mi a suscipit accumsan.Aenean a finibus dui.Pellentesque pulvinar odio id urna cursus, in congue risus auctor.Nulla eget lorem vitae sapien viverra laoreet.Sed non elementum turpis, non ultrices nunc."
}