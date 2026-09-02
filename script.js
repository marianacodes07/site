/* ============================================
   MENU MOBILE
============================================ */
const navToggle = document.getElementById('navToggle');
const siteHeader = document.querySelector('.site-header');

if (navToggle && siteHeader) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteHeader.classList.toggle('nav-open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // fecha o menu ao clicar em um link
  document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', () => {
      siteHeader.classList.remove('nav-open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ============================================
   MÓDULOS (ACORDEÃO DA TRILHA)
============================================ */
document.querySelectorAll('.module-head').forEach(head => {
  head.addEventListener('click', () => {
    const module = head.closest('.module');
    const alreadyOpen = module.classList.contains('open');

    // fecha os outros módulos abertos
    document.querySelectorAll('.module.open').forEach(m => m.classList.remove('open'));

    if (!alreadyOpen) {
      module.classList.add('open');
    }
  });
});

// abre o primeiro módulo por padrão
const firstModule = document.querySelector('.module');
if (firstModule) firstModule.classList.add('open');

/* ============================================
   FAQ (ACORDEÃO)
============================================ */
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.closest('.faq-item');
    const alreadyOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));

    if (!alreadyOpen) {
      item.classList.add('open');
    }
  });
});

/* ============================================
   BOTÃO FLUTUANTE (aparece ao rolar a página)
============================================ */
const floatingCta = document.getElementById('floatingCta');
const heroSection = document.querySelector('.hero');

if (floatingCta && heroSection) {
  const revealPoint = heroSection.offsetTop + heroSection.offsetHeight;

  window.addEventListener('scroll', () => {
    if (window.scrollY > revealPoint) {
      floatingCta.classList.add('visible');
    } else {
      floatingCta.classList.remove('visible');
    }
  }, { passive: true });
}

/* ============================================
   EFEITO DE "DIGITAÇÃO" NO EDITOR DO HERO
============================================ */
const typedCodeEl = document.getElementById('typedCode');

const codeSnippet =
`<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <title>Meu primeiro site</title>
  </head>
  <body>
    <h1>Ol\u00e1, mundo!</h1>
    <p>Comecei do zero.</p>
  </body>
</html>`;

function digitarCodigo(texto, elemento, velocidade = 28) {
  if (!elemento) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    elemento.textContent = texto;
    return;
  }

  let index = 0;

  function passo() {
    elemento.textContent = texto.slice(0, index);
    index++;

    if (index <= texto.length) {
      setTimeout(passo, velocidade);
    } else {
      // pausa e reinicia, simulando um loop de digitação contínuo
      setTimeout(() => {
        index = 0;
        passo();
      }, 2600);
    }
  }

  passo();
}

digitarCodigo(codeSnippet, typedCodeEl);

/* ============================================
   ANIMAÇÃO SUAVE AO ENTRAR NA TELA (uma única vez, discreta)
============================================ */
const observados = document.querySelectorAll('.module, .faq-item, .intro-points li');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.style.opacity = '1';
        entrada.target.style.transform = 'none';
        observer.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });

  observados.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    observer.observe(el);
  });
}