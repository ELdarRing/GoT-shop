const themeButton=document.querySelector('.theme');
function updateTheme(){const dark=document.documentElement.dataset.theme==='dark';themeButton.setAttribute('aria-pressed',String(dark));themeButton.setAttribute('aria-label',dark?'Включить светлую тему':'Включить тёмную тему');themeButton.querySelector('.theme-label').textContent=dark?'Светлая тема':'Тёмная тема';themeButton.querySelector('.theme-icon').textContent=dark?'☀':'☾';document.querySelector('meta[name="theme-color"]').content=dark?'#19271f':'#f6f4eb'}
updateTheme();themeButton.addEventListener('click',()=>{document.documentElement.dataset.theme=document.documentElement.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('tavria-theme',document.documentElement.dataset.theme)}catch(e){}updateTheme()});
document.querySelectorAll('[data-service]').forEach(link=>link.addEventListener('click',()=>{document.querySelector('select[name="service"]').value=link.dataset.service}));
document.getElementById('year').textContent=new Date().getFullYear();
document.getElementById('contact-form').addEventListener('submit',event=>{event.preventDefault();const form=event.currentTarget;const status=form.querySelector('.form-status');const data=Object.fromEntries(new FormData(form));if(!data.name.trim()||!data.contact.trim()){status.textContent='Пожалуйста, укажите имя и контакт.';return}if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contact.trim())||/^\+?[\d\s()\-]{7,22}$/.test(data.contact.trim()))){status.textContent='Укажите email или номер телефона, например +7 701 123 45 67.';form.elements.contact.focus();return}try{localStorage.setItem('tavria-request',JSON.stringify({...data,savedAt:new Date().toISOString()}));status.textContent='Запрос сохранён в вашем браузере. В лавку он пока не отправлен.'}catch(e){status.textContent='Браузер не разрешил сохранить запрос. Попробуйте разрешить локальное хранение.'}});

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('.questions details').forEach(details => {
  const summary = details.querySelector('summary');
  let animation;
  let expanded = details.open;
  summary.setAttribute('aria-expanded', String(expanded));
  summary.querySelector('span').setAttribute('aria-hidden', 'true');
  summary.addEventListener('click', event => {
    if (motionPreference.matches || !details.animate) return;
    event.preventDefault();
    const startHeight = details.getBoundingClientRect().height;
    if (animation) animation.cancel();
    expanded = !expanded;
    summary.setAttribute('aria-expanded', String(expanded));
    details.classList.toggle('is-expanded', expanded);
    details.style.height = '';
    details.open = expanded;
    const endHeight = details.getBoundingClientRect().height;
    details.open = true;
    details.style.height = `${startHeight}px`;
    details.style.overflow = 'hidden';
    animation = details.animate(
      { height: [`${startHeight}px`, `${endHeight}px`] },
      { duration: 320, easing: 'cubic-bezier(.22, 1, .36, 1)' }
    );
    animation.onfinish = () => {
      details.open = expanded;
      details.style.height = '';
      details.style.overflow = '';
      animation = null;
    };
  });
  details.classList.toggle('is-expanded', expanded);
  details.addEventListener('toggle', () => {
    if (animation) return;
    expanded = details.open;
    summary.setAttribute('aria-expanded', String(expanded));
    details.classList.toggle('is-expanded', expanded);
  });
  motionPreference.addEventListener('change', () => {
    if (!motionPreference.matches || !animation) return;
    animation.cancel();
    animation = null;
    details.open = expanded;
    details.style.height = '';
    details.style.overflow = '';
  });
});

if (!motionPreference.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.hero > *, .section-heading, .offer, .reasons article, .faq > *, .contact-grid > *').forEach(element => {
    element.classList.add('reveal');
    observer.observe(element);
  });
}
