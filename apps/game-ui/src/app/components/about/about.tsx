import { makeStyles } from '@material-ui/core';
import React, { FC } from 'react';

const useComponentStyles = makeStyles({
  about: {
    color: '#ee6d3e',
    fontSize: '150%',
    padding: '20px 100px',
  }
});

const About : FC = () => {
  const styles = useComponentStyles();
  return (
    <article className={styles.about}>
      <h1>О Игре</h1>
      <p>В рамках программы по развитию и внедрению ассистивных технологий Центр “Пространство общения” разработал веб-конструктор простых развивающих игр для детей с особыми потребностями. Родители или специалисты могут самостоятельно создавать игры для освоения ребенком причинно-следственных связей.</p>
      <p>В игре ребенку предлагается нажать на кружок на экране (нажатие можно произвести с помощью выносной кнопки, переключателя, адаптированной мышки, тачскрина, айтрекера). После этого появляется экран с фотографией или картинкой, которую вы загрузили сами, и начинает звучать также загруженная вами мелодия. В одну игру можно загрузить сразу несколько картинок и мелодий, тогда они будут чередоваться. Можно выставить определенное время звучания мелодии, после ее окончания вернется начальный экран игры, на котором нужно нажать на кружочек. </p>
      <p>Таким образом, игра позволяет ребенку понять, что от его определенного действия зависит то, что произойдет дальше, т.е. осознать причинно-следственную связь, почувствовать свое влияние на окружающий мир.</p>
      <p>Важно, что в игре можно использовать те аудио- и видеоматериалы, которые привычны и интересны каждому конкретному ребенку. Зарегистрировавшись в личном кабинете, вы можете создавать свои игры в неограниченном количестве и сохранять их. </p>
      <p><i>Веб-конструктор разработан в рамках проекта “Мастерская ассистивных технологий”, поддержанного Фондом президентских грантов.</i></p>
    </article>
  )
}

export default About;