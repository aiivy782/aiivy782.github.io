window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);
}

document.addEventListener('DOMContentLoaded', function() {
  const languageSelect = document.getElementById('language-select');
  const content = {
    en: {
      title: "Egor Muntyan",
      shortBio: "17 y.o. edm musician, the most loyal videogames fan & a bit graphical designer",
      bioTitle: "Bio",
      bio: "Hailing from Sortavala, Egor Muntyan starts trying himself in EDM music. Since his childhood he was listening to Deep House, Dubstep and UK Garage, while his peers were listening to Hip-Hop and Grime. At 12 Egor was started to write his own music, it was really horrible, but over the years, he's gained a great deal of knowledge and experience. Egor can also be called a 'computer worm', because from childhood he was very attracted to computers, all sorts of microchips. He was constantly learning new things, trying to build robots, even trying to write his own virus to have a laugh with his friends. Now Egor knows very well how computers work. He knows how to make 3D models, work in Photoshop, Illustrator, Blender, Cinema 4D and many other programs. Naturally Egor is an avid gamer, he has played a lot of famous and not so famous titles, even tried to make his own game on Unreal Engine, but he quickly lost interest.",
      linksTitle: "Links",
      musicTitle: "Music"
    },
    ru: {
      title: "Егор Мунтьян",
      shortBio: "17-летний edm-музыкант, самый преданный фанат видеоигр и немного графический дизайнер",
      bioTitle: "Биография",
      bio: "Родом из Сортавалы, Егор Мунтьян начинает пробовать себя в EDM-музыке. С детства он слушал Deep House, Dubstep и UK Garage, в то время как его сверстники слушали Hip-Hop и Grime. В 12 лет Егор начал писать свою музыку, по началу получалось действительно ужасно, но с годами он приобрел большой опыт и знания. Егора также можно назвать «компьютерным червем», потому что с детства его очень тянуло к компьютерам, всяким микросхемам. Он постоянно учился чему-то новому, пытался строить роботов, даже пытался написать свой вирус, чтобы посмеяться с друзьями. Сейчас Егор отлично знает, как работают компьютеры. Он умеет делать 3D-модели, работать в Photoshop, Illustrator, Blender, Cinema 4D и многих других программах. Егор, конечно, заядлый геймер, он переиграл во множество известных и не очень игр, даже пытался сделать свою собственную игру на Unreal Engine, но быстро потерял интерес.",
      linksTitle: "Ссылки",
      musicTitle: "Музыка"
    },
    fi: {
      title: "Egor Muntian",
      shortBio: "17-vuotias edm-muusikko, omistautunein videopelien fani ja hieman graafinen suunnittelija.",
      bioTitle: "Elämäkerta",
      bio: "Sortavalalainen Egor Muntian alkoi kokeilla EDM-musiikkia. Lapsesta lähtien hän kuunteli Deep Housea, Dubstepiä ja UK Garagea, kun taas hänen ikätoverinsa kuuntelivat Hip-Hopia ja Grimea. 12-vuotiaana Egor alkoi kirjoittaa omaa musiikkia, aluksi se oli kamalaa, mutta vuosien varrella hän sai paljon kokemusta. Egoria voidaan kutsua myös ”tietokonemadoksi”, koska hän oli lapsesta asti hyvin kiinnostunut tietokoneista ja kaikenlaisista mikrosiruista. Hän oppi jatkuvasti jotain uutta, yritti rakentaa robotteja ja kirjoitti jopa oman viruksen naurattaakseen ystäviään. Nyt Egor tietää hyvin, miten tietokoneet toimivat. Hän osaa luoda 3D-malleja, työskennellä Photoshop, Illustrator, Blender, Cinema 4D ja monissa muissa ohjelmissa. Egor on tietysti innokas pelaaja, hän on pelannut monia kuuluisia ja vähemmän kuuluisia pelejä, ja hän jopa yritti tehdä oman pelinsä Unreal Engineen, mutta menetti nopeasti kiinnostuksensa.",
      linksTitle: "Linkit",
      musicTitle: "Musiikki"
    },
    es: {
      title: "Egor Muntian",
      shortBio: "Un músico edm de 17 años, el más dedicado fan de los videojuegos y un poco diseñador gráfico.",
      bioTitle: "Biografía",
      bio: "Egor Muntean, de Sortavala, empezó a experimentar con la música EDM. Desde niño escuchaba Deep House, Dubstep y UK Garage, mientras que sus compañeros escuchaban Hip-Hop y Grime. A los 12 años Egor empezó a componer su propia música, al principio era terrible pero con los años adquirió mucha experiencia. A Egor también se le puede llamar «gusano informático», porque desde niño le interesaban mucho los ordenadores y todo tipo de microchips. Siempre aprendía algo nuevo, intentaba construir robots e incluso escribió su propio virus para hacer reír a sus amigos. Ahora Egor sabe muy bien cómo funcionan los ordenadores. Sabe crear modelos 3D, trabajar con Photoshop, Illustrator, Blender, Cinema 4D y muchos otros programas. Por supuesto, Egor es un ávido jugador, ha jugado a muchos juegos famosos y no tan famosos, incluso intentó crear su propio juego en Unreal Engine, pero rápidamente perdió el interés.",
      linksTitle: "Enlaces",
      musicTitle: "Música"
    }
  };

  function updateContent(language) {
    document.getElementById('title').textContent = content[language].title;
    document.getElementById('short-bio').textContent = content[language].shortBio;
    document.getElementById('bio-title').textContent = content[language].bioTitle;
    document.getElementById('bio').textContent = content[language].bio;
    document.getElementById('links-title').textContent = content[language].linksTitle;
    document.getElementById('music').textContent = content[language].musicTitle;
  }

  languageSelect.addEventListener('change', function() {
    const selectedLanguage = languageSelect.value;
    updateContent(selectedLanguage);
  });

  const userLanguage = navigator.language || navigator.userLanguage;
  const defaultLanguage = userLanguage.split('-')[0];

  if (content[defaultLanguage]) {
    updateContent(defaultLanguage);
    languageSelect.value = defaultLanguage;
  } else {
    updateContent('en');
    languageSelect.value = 'en';
  }
});