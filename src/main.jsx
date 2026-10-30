import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X, MapPin, Phone, Clock3, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import './style.css';

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

const studentWorks = [
  ['photo-01.webp', 'Заяц-подвеска из цветной мозаики', 'Мозаичная подвеска'],
  ['photo-02.webp', 'Небольшая мозаичная работа в руках', 'Авторская работа'],
  ['photo-03.webp', 'Рабочий стол с мозаикой и фрагментами плитки', 'В процессе'],
  ['photo-04.webp', 'Мозаичная картина в раме', 'Мозаичная картина'],
  ['photo-05.webp', 'Красная композиция из керамических фрагментов', 'Работа из осколков'],
  ['photo-07.webp', 'Подготовка разноцветных фрагментов для мозаики', 'Подбор фрагментов'],
  ['photo-08.webp', 'Мозаичная подвеска на ладони', 'Подвеска-бабочка'],
  ['photo-09.webp', 'Мозаичная фигурка животного', 'Фигурная мозаика'],
  ['photo-10.webp', 'Мозаичная сезонная фигурка', 'Сезонная мозаика'],
  ['photo-11.webp', 'Мозаичная маска из цветных фрагментов', 'Мозаичная маска'],
  ['photo-12.webp', 'Мозаичная картина на рабочем столе', 'Работа в мастерской'],
  ['photo-13.webp', 'Ребёнок держит небольшую мозаичную фигурку', 'Детская работа'],
  ['photo-20.webp', 'Фигурка оленя из керамических фрагментов', 'Мозаичная скульптура'],
].map(([file, alt, label]) => ({ src: asset(`images/user-photos/${file}`), alt, label }));

const productVariants = [
  ['photo-14.webp', 'Цветочная мозаичная композиция на цветной основе', 'Цветные цементы'],
  ['photo-15.webp', 'Работа из осколков посуды в технике тренкадис', 'Тренкадис'],
  ['photo-16.webp', 'Круглая мозаичная подставка под горячее', 'Подставка под горячее'],
  ['photo-17.webp', 'Подсвечник, украшенный цветным стеклом', 'Витражный подсвечник'],
  ['photo-18.webp', 'Ключница, декорированная цветным стеклом', 'Ключница'],
  ['photo-19.webp', 'Фигурка слона, оформленная мозаикой', 'Мозаичный арт'],
].map(([file, alt, label]) => ({ src: asset(`images/user-photos/${file}`), alt, label }));

const productGroups = [
  {
    id: 'children', title: 'Мастер-классы для детей', subtitle: 'Мозаика для маленьких авторов — знакомство с цветом, формой и материалом.',
    items: [
      { name: 'Пиксельная мозаика · 7+', kind: 'Детский мастер-класс', description: 'Занятие для детей от 7 лет. В расписании мастерской — по субботам.', price: '1 200 ₽', image: 'photo-13.webp', alt: 'Ребёнок держит небольшую мозаичную фигурку' },
      { name: 'Мозаика в ладошке', kind: 'Выездное и сезонное занятие', description: 'Небольшая формочка с мозаикой — магнит или ёлочная игрушка. Этот мастер-класс не проводится отдельно в студии: он проходит на выезде в школах, на городских событиях, маркетах и корпоративах.', price: '600 ₽', image: 'photo-08.webp', alt: 'Небольшая мозаичная подвеска на ладони' },
      { name: 'Набор «Мозаика в ладошке»', kind: 'Можно взять дополнительно', description: 'В набор входят формочка, клей, инструкция и цветное стекло. Его предлагают после выездного занятия, когда участники видят готовую работу.', price: '700 ₽', image: 'photo-07.webp', alt: 'Цветные фрагменты и материалы для мозаики' },
    ],
  },
  {
    id: 'adults', title: 'Мастер-классы для взрослых', subtitle: 'Стекло, камень и смальта, тренкадис — выберите технику по душе.',
    items: [
      { name: 'Мозаика из стекла 15 × 15', kind: 'Витражное стекло', description: 'Небольшая картина из витражного стекла, создаётся с помощью инструментов. Обычно нужно две встречи.', price: '3 000 ₽', image: 'photo-04.webp', alt: 'Мозаичная картина в раме' },
      { name: 'Римская мозаика', kind: 'Камень и смальта', description: 'Мозаика 15 × 15 см из камня и смальты. Работа выполняется инструментами; обычно требуется две встречи.', price: '3 500 ₽', image: 'photo-02.webp', alt: 'Небольшая мозаичная работа в руках' },
      { name: 'Тренкадис', kind: 'Мозаика из битой посуды', description: 'Яркая творческая работа из разбитой посуды на фанерной форме. Продолжительность занятия — около пяти часов.', price: '2 500 ₽', image: 'photo-15.webp', alt: 'Работа из осколков посуды в технике тренкадис' },
    ],
  },
  {
    id: 'outreach', title: 'Выездные мероприятия', subtitle: 'Праздник в мастерской или творческое занятие на вашей площадке.',
    items: [
      { name: 'День рождения, девичник или корпоратив', kind: 'Праздник в мастерской', description: 'Гости создают готовые мозаичные изделия за общим столом. Мозаичная часть занимает 3–4 часа, встреча — около пяти часов.', price: '10 000 ₽ · 5 гостей', extra: '+1 800 ₽ за каждого дополнительного гостя', image: 'workshop.png', alt: 'Большой стол в светлой мастерской мозаики' },
      { name: 'Мозаика в ладошке на выезде', kind: 'Для школ и городских событий', description: 'Маленькая мозаичная форма — магнит или ёлочная игрушка. Выездные занятия проходят в школах, на городских мероприятиях, маркетах и корпоративах; отдельно в студии этот мастер-класс не проводится.', price: '600 ₽', image: 'photo-08.webp', alt: 'Небольшая мозаичная подвеска на ладони' },
    ],
  },
].map((group) => ({ ...group, items: group.items.map((item) => ({ ...item, image: asset(item.image === 'workshop.png' ? 'images/workshop.png' : `images/user-photos/${item.image}`) })) }));

const schedule = [
  ['Среда', '17:30—21:30', 'Мозаика на свободную тему', '2 500 ₽'],
  ['Четверг', '11:00—15:00', 'Мозаика из боя стекла', '1 500 ₽'],
  ['Суббота', '12:00—15:00', 'Пиксельная мозаика · 7+', '1 200 ₽'],
  ['Воскресенье', '11:00—15:00', 'Мозаика на свободную тему', '2 500 ₽'],
];

const reviews = [
  { name: 'Светлана В.', date: '24 июня 2026', text: 'Время за мозаикой пролетает незаметно.' },
  { name: 'Анастасия Носова', date: '13 мая 2023', text: 'Увлекательное занятие, за делом и приятным разговором время…' },
  { name: 'Роман Грачев', date: '2 февраля 2024', text: 'Это что-то новенькое и очень красивое.' },
];

function PhotoGrid({ items, className = '', reveal }) {
  return <div className={`gallery-grid ${className}`}>{items.map((photo, i) => <motion.figure {...reveal} key={photo.src} className="gallery-item"><div className="img-frame"><img src={photo.src} alt={photo.alt} loading="lazy"/><span className="img-number">{String(i + 1).padStart(2, '0')}</span></div><figcaption>{photo.label}<ArrowUpRight size={15}/></figcaption></motion.figure>)}</div>;
}

function ProductCards({ items, reveal }) {
  return <div className="product-grid">{items.map((product, i) => <motion.article {...reveal} className="product-card" key={product.name}><div className="product-image"><img src={product.image} alt={product.alt} loading="lazy"/><span>{String(i + 1).padStart(2, '0')}</span></div><div className="product-info"><span className="product-kind">{product.kind}</span><h3>{product.name}</h3><p>{product.description}</p><div className="product-bottom"><strong>{product.price}</strong>{product.extra&&<small>{product.extra}</small>}<a href="tel:+79059922525" aria-label={`Уточнить про: ${product.name}`}><ArrowUpRight size={17}/></a></div></div></motion.article>)}</div>;
}
function App() {
  const [open, setOpen] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const reduce = useReducedMotion();
  const reveal = { initial: { opacity: 0, y: reduce ? 0 : 26 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: reduce ? 0 : .65, ease: [.22, .7, .25, 1] } };
  const close = () => setOpen(false);
  const stepReview = (direction) => setReviewIndex((index) => (index + direction + reviews.length) % reviews.length);
  const review = reviews[reviewIndex];
  return <>
    <header className="header"><a href="#top" className="brand" aria-label="Мозаика — на главную"><span className="brand-mark"><i/><i/><i/><i/></span><span>мозаика<small>мастерская Ирины Грачевой</small></span></a>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={open}>{open ? <X/> : <Menu/>}</button>
      <nav className={open ? 'nav nav-open' : 'nav'} aria-label="Основная навигация"><a onClick={close} href="#products">Продукты и встречи</a><a onClick={close} href="#schedule">Расписание</a><a onClick={close} href="#reviews">Отзывы</a><a onClick={close} href="#contacts">Контакты</a><a className="nav-cta" href="tel:+79059922525">Позвонить <ArrowUpRight size={15}/></a></nav>
    </header>
    <main id="top">
      <section className="hero">
        <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot"/> Томск · мастерская мозаики</div><h1>Соберите<br/>свою <em>историю</em></h1><p className="hero-sub">Цветное стекло, тёплый свет и несколько часов только для себя.</p><p className="hero-desc">Мастер-классы по мозаике для взрослых и детей в мастерской Ирины Грачевой.</p><div className="hero-actions"><a className="button button-dark" href="#products">Выбрать формат <ArrowRight size={17}/></a><a className="text-link" href="#variants">Смотреть работы <ArrowDown size={15}/></a></div><div className="hero-note"><Sparkles size={15}/> Мозаика из стекла и плитки</div></div>
        <div className="hero-art"><div className="hero-photo-wrap"><img className="hero-photo" src={asset('images/workshop.png')} alt="Светлая мастерская мозаики с большим общим столом"/><div className="photo-tag"><span className="tag-swatch"/> место, где рождаются истории</div></div><div className="floating-tile tile-one"/><div className="floating-tile tile-two"/><div className="hero-index">01 <span>— 03</span></div><div className="orbit-note">Ручная работа<br/>с душой <span>↗</span></div></div>
        <a className="scroll-cue" href="#products"><span>Листайте дальше</span><ArrowDown size={15}/></a>
      </section>
      <section className="gallery section gallery-products" id="variants"><div className="section-head"><div><span className="section-no">01 / ВАРИАНТЫ ТОВАРОВ</span><h2>Формы и цвета<br/><em>мозаики</em></h2></div><p>Примеры изделий и направлений, которые можно создать в мастерской.</p></div><PhotoGrid items={productVariants} className="variant-grid" reveal={reveal}/></section>
      <section className="gallery section gallery-students" id="gallery"><div className="section-head"><div><span className="section-no">02 / РАБОТЫ УЧЕНИКОВ</span><h2>У каждой работы<br/><em>свой характер</em></h2></div><p>Мозаичные картины, фигурки и подвески, созданные участниками занятий.</p></div><div className="gallery-inspiration"><span className="inspiration-mark">✳</span><p>Творим вместе с 2023 года. Уже более <strong>250 человек</strong> собрали в мастерской свою мозаику.<br/><em>Не нужно уметь рисовать — достаточно выбрать первый фрагмент.</em></p></div><PhotoGrid items={studentWorks} reveal={reveal}/></section>
      <section className="products section" id="products"><div className="section-head"><div><span className="section-no">03 / ПРОДУКТЫ И ВСТРЕЧИ</span><h2>Формат под ваш<br/><em>повод</em></h2></div><p>Мастер-классы для детей и взрослых, а также выездные встречи и праздники.</p></div>{productGroups.map((group) => <section className="product-group" id={group.id} key={group.id}><div className="product-group-head"><span className="section-no">{group.id === 'children' ? '01' : group.id === 'adults' ? '02' : '03'} / ФОРМАТ</span><h3>{group.title}</h3><p>{group.subtitle}</p></div><ProductCards items={group.items} reveal={reveal}/>{group.id === 'outreach'&&<div className="event-note"><span>НАБОР ДЛЯ УЧАСТНИКОВ</span><p>Набор «Мозаика в ладошке» с формочкой, клеем, инструкцией и цветным стеклом можно взять дополнительно после выездного занятия.</p><a href="tel:+79059922525">Уточнить детали <ArrowRight size={15}/></a></div>}</section>)}</section>
      <section className="schedule section" id="schedule"><div className="schedule-intro"><span className="section-no">04 / ПЛАНИРУЙТЕ ВСТРЕЧУ</span><h2>Ритм<br/><em>мастерской</em></h2><p>Занятия проходят по расписанию и предварительной записи.</p><div className="discount-sticker">−10%<small>если приходите<br/>вдвоём*</small></div></div><div className="schedule-table">{schedule.map((item,i)=><motion.div {...reveal} className="schedule-row" key={item[0]}><span className="schedule-day"><b>0{i+1}</b>{item[0]}</span><span className="schedule-time">{item[1]}</span><span className="schedule-name">{item[2]}</span><span className="schedule-price">{item[3]}</span></motion.div>)}<p className="schedule-foot">* Предложение указано в расписании мастерской. Расписание и условия уточняйте по телефону.</p><a href="tel:+79059922525" className="button button-dark schedule-cta">Уточнить расписание <ArrowRight size={17}/></a></div></section>
      <section className="reviews section" id="reviews"><div className="reviews-head"><div><span className="section-no">05 / ОТЗЫВЫ ГОСТЕЙ</span><h2>Тёплые слова<br/><em>после встречи</em></h2><div className="reviews-rating"><span>★★★★★</span> 5,0 · 52 оценки</div></div><div className="review-controls"><button onClick={() => stepReview(-1)} aria-label="Предыдущий отзыв"><ChevronLeft/></button><button onClick={() => stepReview(1)} aria-label="Следующий отзыв"><ChevronRight/></button></div></div><div className="review-carousel" aria-live="polite" aria-atomic="true"><article className="review-card"><div className="review-card-top"><span className="review-avatar" aria-hidden="true">{review.name.slice(0,1)}</span><div><strong>{review.name}</strong><small>{review.date}</small></div><span className="review-stars" aria-label="5 из 5">★★★★★</span></div><p>«{review.text}»</p><span className="review-source">Яндекс Карты</span></article><div className="review-position">{String(reviewIndex + 1).padStart(2,'0')} <span>/ {String(reviews.length).padStart(2,'0')}</span></div></div><div className="review-cta-links"><a href="https://yandex.ru/maps/-/CXUH5NYB" target="_blank" rel="noreferrer">Все отзывы на Яндекс Картах <ArrowUpRight size={19}/></a><a href="https://go.2gis.com/KtjY6" target="_blank" rel="noreferrer">Отзывы и оценки в 2ГИС <ArrowUpRight size={19}/></a></div></section>
      <section className="contact section" id="contacts"><div className="contact-copy"><span className="section-no">06 / ПРИХОДИТЕ</span><h2>Встретимся<br/><em>за мозаикой</em></h2><p>Позвоните, чтобы подобрать мастер-класс и время.</p><div className="contact-details"><a href="tel:+79059922525"><Phone/>+7 905 992-25-25</a><div><MapPin/>ул. Алексея Беленца, 9/1, Томск</div><div><Clock3/>Ежедневно 10:00–20:00<br/><small>по предварительной записи</small></div></div><div className="map-links"><a href="https://yandex.ru/maps/-/CXUH5NYB" target="_blank" rel="noreferrer">Яндекс Карты <ArrowUpRight size={18}/></a><a href="https://go.2gis.com/KtjY6" target="_blank" rel="noreferrer">2ГИС <ArrowUpRight size={18}/></a></div><button className="button max-button" type="button" disabled aria-label="MAX — ссылка будет добавлена позже">MAX <span>скоро</span></button></div><div className="contact-art"><img src={asset('images/workshop.png')} alt="Рабочее пространство мастерской" loading="lazy"/><span>До встречи за общим столом</span></div></section>
      <section className="team section" id="team"><div className="section-head"><div><span className="section-no">08 / КОМАНДА</span><h2>Наши<br/><em>мастера</em></h2></div><p>Знакомство с командой мастерской — скоро.</p></div><div className="team-grid">{['Мастер мозаики', 'Мастер мозаики'].map((role, i)=><article className="team-card" key={`${role}-${i}`}><div className="team-photo" aria-label="Место для фотографии мастера"><span>Фото мастера</span></div><div className="team-info"><span>ИМЯ МАСТЕРА</span><h3>{role}</h3><p>Помогает выбрать материал, освоиться с инструментами и собрать собственную мозаику.</p></div></article>)}</div></section>
    </main>
    <footer className="footer"><a href="#top" className="brand brand-footer"><span className="brand-mark"><i/><i/><i/><i/></span><span>мозаика<small>мастерская Ирины Грачевой</small></span></a><span>Томск · 2026</span><a href="https://vk.ru/gracci_mosaic" target="_blank" rel="noreferrer">ВКонтакте <ArrowUpRight size={14}/></a><span className="footer-last">Собрано с теплом <span>✳</span></span></footer>
  </>;
}
createRoot(document.getElementById('root')).render(<App/>);
