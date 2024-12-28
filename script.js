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
      bio: "Hailing from Sortavala, Egor Muntyan starts trying himself in EDM music. Since his childhood he was listening to Deep House, Dubstep and UK Garage, while his peers were listening to Hip-Hop and Grime. At 12 Egor was started to write his own music, it was really horrible, but over the years, he's gained a great deal of knowledge and experience and wants to use it to popularise EDM music in Russia. Egor can also be called a 'computer worm', because from childhood he was very attracted to computers, all sorts of microchips. He was constantly learning new things, trying to build robots, even trying to write his own virus to have a laugh with his friends. Now Egor knows very well how computers work. He knows how to make 3D models, work in Photoshop, Illustrator, Blender, Cinema 4D and many other programs. Naturally Egor is an avid gamer, he has played a lot of famous and not so famous titles, even tried to make his own game on Unreal Engine, but he quickly lost interest.",
      linksTitle: "Links"
    },
    ru: {
      title: "Егор Мунтьян",
      shortBio: "17-летний музыкант EDM, самый преданный фанат видеоигр и немного графический дизайнер",
      bioTitle: "Биография",
      bio: "Родом из Сортавалы, Егор Мунтьян начинает пробовать себя в музыке EDM. С детства он слушал Deep House, Dubstep и UK Garage, в то время как его сверстники слушали Hip-Hop и Grime. В 12 лет Егор начал писать свою музыку, она была действительно ужасной, но с годами он приобрел множество знаний и опыта и хочет использовать их для популяризации музыки EDM в России. Егора также можно назвать 'компьютерным червем', потому что с детства он был очень привязан к компьютерам, всяким микрочипам. Он постоянно учился новому, пытался строить роботов, даже пытался написать свой вирус, чтобы посмеяться с друзьями. Теперь Егор очень хорошо знает, как работают компьютеры. Он умеет делать 3D-модели, работать в Photoshop, Illustrator, Blender, Cinema 4D и многих других программах. Естественно, Егор - заядлый геймер, он играл во многие известные и не очень известные игры, даже пытался сделать свою игру на Unreal Engine, но быстро потерял интерес.",
      linksTitle: "Ссылки"
    }
  };

  function updateContent(language) {
    document.getElementById('title').textContent = content[language].title;
    document.getElementById('short-bio').textContent = content[language].shortBio;
    document.getElementById('bio-title').textContent = content[language].bioTitle;
    document.getElementById('bio').textContent = content[language].bio;
    document.getElementById('links-title').textContent = content[language].linksTitle;
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