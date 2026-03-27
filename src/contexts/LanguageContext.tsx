import React, { createContext, useContext, useState, useEffect } from 'react';

export const languages = {
    es: 'Español',
    en: 'English',
    fr: 'Français',
};

export type LanguageCode = keyof typeof languages;

export const defaultLang: LanguageCode = 'es';

export const ui: Record<LanguageCode, Record<string, string>> = {
    es: {
        // Navigation
        'nav.home': 'Inicio',
        'nav.howItWorks': '¿Cómo funciona?',
        'nav.region': 'La Región',
        'nav.technology': 'Tecnología',
        'nav.impact': 'Impacto',
        'nav.about': 'Nosotros',
        'nav.testimonials': 'Testimonios',
        'nav.faqs': 'FAQs',
        'nav.contact': 'Contacto',
        'nav.start': 'Descubrir mi ruta',

        // Accessibility
        'accessibility.changeLanguage': 'Cambiar idioma',
        'accessibility.toggleTheme': 'Alternar tema oscuro/claro',
        'accessibility.toggleMenu': 'Abrir menú móvil',

        // Hero
        'hero.label': 'Las Altas Montañas • Veracruz • México',
        'hero.title': 'Tu próxima aventura\nvive entre la neblina',
        'hero.subtitle': 'SMARTUR conoce los rincones que los mapas no muestran. Cuéntanos qué buscas y te diseñamos una ruta a la medida de tu alma viajera.',
        'hero.cta': 'Descubrir mi ruta ideal',
        'hero.cta.secondary': 'Ver cómo funciona',
        'hero.marquee.1': 'Café de altura',
        'hero.marquee.2': 'Senderos entre niebla',
        'hero.marquee.3': 'Cultura Totonaca',
        'hero.marquee.4': 'Cascadas ocultas',
        'hero.marquee.5': 'Pueblos Mágicos',
        'hero.marquee.6': 'Gastronomía auténtica',

        // How it works
        'how.label': '¿Cómo funciona?',
        'how.title': 'Tres pasos. Una aventura perfecta.',
        'how.step1.title': 'Cuéntanos quién eres',
        'how.step1.text': 'Responde unas preguntas sobre tus gustos, presupuesto y tipo de experiencia que buscas. Nada de formularios aburridos.',
        'how.step2.title': 'Nuestra IA trabaja',
        'how.step2.text': 'Algoritmos de Machine Learning analizan miles de opciones reales en las Altas Montañas y construyen tu ruta personalizada.',
        'how.step3.title': 'Descubre y vive',
        'how.step3.text': 'Recibe recomendaciones de hoteles, restaurantes y actividades que conectan con tu esencia. Apoyando a productores locales.',

        // Impact
        'impact.label': 'Impacto real',
        'impact.title': 'Cada viaje, una historia que transforma',
        'impact.subtitle': 'Cuando usas SMARTUR, no solo descubres un destino — contribuyes directamente a la economía de familias veracruzanas.',
        'impact.stat1.number': '100',
        'impact.stat1.suffix': '+',
        'impact.stat1.label': 'MiPyMEs impulsadas',
        'impact.stat2.number': '50',
        'impact.stat2.suffix': 'K+',
        'impact.stat2.label': 'Rutas generadas',
        'impact.stat3.number': '15',
        'impact.stat3.suffix': '+',
        'impact.stat3.label': 'Municipios cubiertos',
        'impact.stat4.number': '98',
        'impact.stat4.suffix': '%',
        'impact.stat4.label': 'Turistas satisfechos',

        // Storytelling
        'story.hook.label': 'El problema',
        'story.hook.title': 'Deja de buscar.\nEmpieza a encontrar.',
        'story.hook.text': 'Horas saltando de blog en blog, fotos retocadas en Instagram, y siempre los mismos tres lugares saturados. El ruido digital convirtió planear un viaje en agotador.',
        'story.conflict.label': 'El miedo real',
        'story.conflict.title': 'No es no encontrar hotel.\nEs volver sintiéndote turista.',
        'story.conflict.text': 'El viajero actual no quiere ser un número. Quiere conectar con la esencia de las Altas Montañas: ese productor de café que te invitaría a su milpa, esa cascada que solo los lugareños conocen.',
        'story.guide.label': 'La solución',
        'story.guide.title': 'Tu insider local.\nInteligente y personal.',
        'story.guide.text': 'SMARTUR entiende que no hay dos viajeros iguales. Por eso no te da una lista — te diseña una ruta que respira Veracruz.',
        'story.cta.label': 'Tu aventura empieza aquí',
        'story.cta.title': 'El primer paso de tu viaje.',
        'story.cta.text': 'Cuéntanos qué tipo de experiencia buscas. La magia comienza cuando SMARTUR te conoce.',
        'story.cta.button': 'Personalizar mi aventura ahora',

        // Testimonials
        'testimonials.label': 'Testimonios',
        'testimonials.title': 'Lo que dicen los viajeros',
        'testimonials.item1.name': 'Andrea M.',
        'testimonials.item1.role': 'Viajera independiente, CDMX',
        'testimonials.item1.content': 'Jamás hubiera encontrado la cabaña entre los pinos de Nogales sola. SMARTUR me llevó exactamente ahí. El café de olla al amanecer fue el momento más auténtico de mi vida.',
        'testimonials.item2.name': 'Carlos R.',
        'testimonials.item2.role': 'Familia de 4, Puebla',
        'testimonials.item2.content': 'Le pregunté a SMARTUR qué hacer con niños en la zona. En 5 minutos tenía un itinerario perfecto: desde el Pico de Orizaba hasta una chocolatería artesanal en Córdoba.',
        'testimonials.item3.name': 'Sophie L.',
        'testimonials.item3.role': 'Turista internacional, Francia',
        'testimonials.item3.content': 'I told SMARTUR I wanted to find authentic coffee culture. It sent me to a small farm in Huatusco. The owners became like family. This is why travel exists.',

        // Contact / Form Invitation
        'contact.label': 'Empieza aquí',
        'contact.title': '¿Qué aroma buscas hoy?',
        'contact.subtitle': 'Tu ruta personalizada empieza con una pregunta. Cuéntanos sobre ti y dejemos que la IA haga su magia.',
        'contact.cta.button': 'Comenzar mi aventura',
        'contact.email.placeholder': 'tu@correo.com',
        'contact.name.placeholder': '¿Cómo te llamas, viajero?',
        'contact.intro': 'Déjanos tu correo y te guiamos al formulario de recomendaciones inteligentes.',
        'contact.success': '¡Perfecto! Revisa tu correo para empezar.',

        // FAQs
        'faqs.label': 'Preguntas frecuentes',
        'faqs.title': 'Preguntas Frecuentes',
        'faq1.question': '¿SMARTUR es gratuito para turistas?',
        'faq1.answer': 'Sí. SMARTUR es completamente gratuito para viajeros. Nuestro modelo de negocio se basa en el apoyo a las MiPyMEs locales, no en cobrarte a ti.',
        'faq2.question': '¿Cómo personaliza SMARTUR mis recomendaciones?',
        'faq2.answer': 'Utilizamos algoritmos de Machine Learning que aprenden de tus preferencias de viaje, presupuesto, intereses y contexto para sugerirte experiencias que realmente te van a gustar.',
        'faq3.question': '¿Los negocios recomendados son reales y verificados?',
        'faq3.answer': 'Absolutamente. Trabajamos directamente con MiPyMEs de las Altas Montañas que están registradas en nuestra plataforma. No somos un agregador genérico.',
        'faq4.question': '¿Puedo usar SMARTUR desde mi app móvil?',
        'faq4.answer': 'Sí. SMARTUR está disponible como app móvil y también como plataforma web. Las mismas recomendaciones inteligentes en cualquier dispositivo.',
        'faq5.question': '¿Y si no me gustan las recomendaciones?',
        'faq5.answer': 'Nos lo dices y mejoramos. Cada retroalimentación entrena mejor a nuestra IA. Puedes refinar tus preferencias en cualquier momento para obtener sugerencias más afinadas.',

        // Landing Map (VideoSection)
        'map.header.titleHtml': 'Descubre la región de las <span style="color:var(--color-purple)">Altas Montañas</span>',
        'map.header.description': 'Explora los municipios de la región a través de nuestro mapa interactivo de alta precisión.',
        'map.panel.title': 'Mapa Regional',
        'map.municipios': 'municipios',
        'map.selection.prefix': 'Seleccion: ',
        'map.selection.none': 'Sin seleccion',
        'map.visualization.title': 'Visualizacion',
        'map.visualization.hint': 'Selecciona un municipio para centrar el mapa con una vista cinematica.',
        'map.actions.centerRegion': 'Centrar region',
        'map.actions.clearSelection': 'Limpiar seleccion',
        'map.popup.subtitle': 'Altas Montañas, Veracruz',

        // Landing Hero / Divider / ActionBridge / About
        'heroSection.titleHtml': 'IA que <span style="color: #ff4d8d">guía,</span><br/><span style="color: #4db9ca">turismo</span> que une.',
        'heroSection.subtitle': 'Explora las Altas Montañas de Veracruz con rutas personalizadas por inteligencia artificial.',
        'heroSection.cta': 'Empezar aventura',
        'heroSection.scrollIndicator': 'Descubrir',

        'flightDivider.line1': 'RECORRIENDO EL',
        'flightDivider.line2': 'CAMINO JUNTOS',

        'actionBridge.business.label': 'Soy un Negocio',
        'actionBridge.business.description': 'Digitaliza tu oferta y llega a más turistas con nuestra IA.',
        'actionBridge.tourist.label': 'Soy Turista',
        'actionBridge.tourist.description': 'Descubre la ruta perfecta diseñada solo para ti.',

        'about.sectionLabel': 'Sobre SMARTUR',
        'about.headingPrefix': 'Impulsando el futuro del ',
        'about.headingHighlight': 'Turismo Regional',
        'about.subtitle': 'SMARTUR es la plataforma de IA ganadora del Galardón Turístico Mi Veracruz 2024, diseñada para revolucionar la forma en que exploramos nuestras montañas.',
        'about.award.badge': 'Veracruz',
        'about.award.title': 'Galardón Turístico Mi Veracruz',
        'about.award.year': '2024',

        'about.slide.mission.label': 'Nuestra Misión',
        'about.slide.mission.text': 'Empoderar a las MiPyMEs de las Altas Montañas mediante inteligencia artificial accesible, fomentando un crecimiento económico equitativo y sostenible en la región.',
        'about.slide.vision.label': 'Nuestra Visión',
        'about.slide.vision.text': 'Ser el ecosistema digital líder en México para el turismo regional, donde la tecnología y la tradición se unen para crear experiencias inolvidables.',
        'about.slide.values.label': 'Nuestros Valores',
        'about.slide.values.text': 'Innovación con propósito, transparencia, compromiso con la comunidad y excelencia en cada recomendación generada por nuestra IA.',

        'about.timeline.item1.title': 'Análisis Contextual',
        'about.timeline.item1.text': 'Nuestra IA procesa datos regionales para entender la oferta única de cada municipio.',
        'about.timeline.item2.title': 'Vinculación Directa',
        'about.timeline.item2.text': 'Conectamos a los turistas con los negocios locales de forma precisa y personalizada.',
        'about.timeline.item3.title': 'Impacto Medible',
        'about.timeline.item3.text': 'Generamos reportes detallados del crecimiento y las tendencias del turismo en la zona.',
        'about.timeline.item4.title': 'Evolución Constante',
        'about.timeline.item4.text': 'Aprendemos de cada interacción para mejorar las rutas y recomendaciones futuras.',

        // PWA Info Cards / Modals (Landing)
        'pwa.info.company-values.title': 'Nuestro ADN',
        'pwa.info.company-values.highlight': 'Valores SMARTUR',
        'pwa.info.company-values.description': 'Transparencia, innovación responsable y turismo regenerativo para que cada experiencia genere impacto positivo.',
        'pwa.info.pymes.title': 'Impulso a PyMES',
        'pwa.info.pymes.highlight': 'Apoyo a MiPyMEs',
        'pwa.info.pymes.description': 'Conectamos emprendimientos turísticos con viajeros listos para descubrir rutas genuinas.',
        'pwa.info.ods.title': 'Alineados a las ODS',
        'pwa.info.ods.highlight': 'Agenda 2030',
        'pwa.info.ods.description': 'Cada recomendación prioriza proyectos con enfoque sostenible y comunidades cuidadas.',
        'pwa.modal.understood': 'Entendido',
        'pwa.modal.aboutLabel': 'Sobre SMARTUR',
        'pwa.modal.title': 'Conoce nuestra esencia',
        'pwa.modal.subtitle': 'Toca una tarjeta para ver más detalle.',

        // PWA Home (standalone)
        'pwaHome.logoutButton': 'Cerrar sesión',
        'pwaHome.loginButton': 'Iniciar sesión',
        'pwaHome.whereTop': '¿A dónde',
        'pwaHome.whereBottom': 'vamos?',
        'pwaHome.regionTop': 'Región',
        'pwaHome.regionBottom': 'Montañas',
        'pwaHome.essenceTop': 'Nuestra',
        'pwaHome.essenceBottom': 'esencia',

        // Footer
        'footer.slogan': 'Donde la IA encuentra tu Veracruz',
        'footer.description': 'Plataforma de turismo inteligente que conecta viajeros con experiencias auténticas en las Altas Montañas de Veracruz.',
        'footer.copyright': 'Todos los derechos reservados.',
    },
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.howItWorks': 'How it works',
        'nav.region': 'The Region',
        'nav.technology': 'Technology',
        'nav.impact': 'Impact',
        'nav.about': 'About',
        'nav.testimonials': 'Testimonials',
        'nav.faqs': 'FAQs',
        'nav.contact': 'Contact',
        'nav.start': 'Plan my trip',

        // Accessibility
        'accessibility.changeLanguage': 'Change language',
        'accessibility.toggleTheme': 'Toggle dark/light theme',
        'accessibility.toggleMenu': 'Open mobile menu',

        // Hero
        'hero.label': 'Altas Montañas • Veracruz • Mexico',
        'hero.title': 'Your next adventure\nlives in the mist',
        'hero.subtitle': 'SMARTUR knows the hidden corners that maps don\'t show. Tell us what you\'re looking for and we\'ll design a route tailored to your traveler\'s soul.',
        'hero.cta': 'Discover my ideal route',
        'hero.cta.secondary': 'See how it works',
        'hero.marquee.1': 'High-altitude coffee',
        'hero.marquee.2': 'Misty trails',
        'hero.marquee.3': 'Totonac culture',
        'hero.marquee.4': 'Hidden waterfalls',
        'hero.marquee.5': 'Magical Towns',
        'hero.marquee.6': 'Authentic food',

        // How it works
        'how.label': 'How it works',
        'how.title': 'Three steps. One perfect adventure.',
        'how.step1.title': 'Tell us who you are',
        'how.step1.text': 'Answer a few questions about your tastes, budget, and the kind of experience you\'re looking for. No boring forms.',
        'how.step2.title': 'Our AI gets to work',
        'how.step2.text': 'Machine Learning algorithms analyze thousands of real options across the Altas Montañas and build your personalized route.',
        'how.step3.title': 'Discover and live',
        'how.step3.text': 'Get recommendations for hotels, restaurants, and activities that connect with your soul — and support local producers.',

        // Impact
        'impact.label': 'Real impact',
        'impact.title': 'Every trip, a story that transforms',
        'impact.subtitle': 'When you use SMARTUR, you\'re not just discovering a destination — you\'re directly contributing to the economy of Veracruz families.',
        'impact.stat1.number': '100',
        'impact.stat1.suffix': '+',
        'impact.stat1.label': 'SMEs empowered',
        'impact.stat2.number': '50',
        'impact.stat2.suffix': 'K+',
        'impact.stat2.label': 'Routes generated',
        'impact.stat3.number': '15',
        'impact.stat3.suffix': '+',
        'impact.stat3.label': 'Municipalities covered',
        'impact.stat4.number': '98',
        'impact.stat4.suffix': '%',
        'impact.stat4.label': 'Satisfied travelers',

        // Storytelling
        'story.hook.label': 'The problem',
        'story.hook.title': 'Stop searching.\nStart finding.',
        'story.hook.text': 'Hours jumping from blog to blog, retouched Instagram photos, always the same three crowded places. Digital noise turned trip planning into exhaustion.',
        'story.conflict.label': 'The real fear',
        'story.conflict.title': 'It\'s not about not finding a hotel.\nIt\'s coming back feeling like a tourist.',
        'story.conflict.text': 'Modern travelers don\'t want to be a number. They want to connect with the essence of the Altas Montañas: a coffee farmer who\'d invite you to his farm, a waterfall only locals know about.',
        'story.guide.label': 'The solution',
        'story.guide.title': 'Your local insider.\nIntelligent and personal.',
        'story.guide.text': 'SMARTUR understands that no two travelers are alike. So it doesn\'t give you a list — it designs a route that breathes Veracruz.',
        'story.cta.label': 'Your adventure starts here',
        'story.cta.title': 'The first step of your journey.',
        'story.cta.text': 'Tell us what kind of experience you\'re looking for. The magic begins when SMARTUR gets to know you.',
        'story.cta.button': 'Personalize my adventure now',

        // Testimonials
        'testimonials.label': 'Testimonials',
        'testimonials.title': 'What travelers say',
        'testimonials.item1.name': 'Andrea M.',
        'testimonials.item1.role': 'Solo traveler, Mexico City',
        'testimonials.item1.content': 'I never would have found the cabin among the Nogales pines on my own. SMARTUR took me exactly there. The morning coffee at dawn was the most authentic moment of my life.',
        'testimonials.item2.name': 'Carlos R.',
        'testimonials.item2.role': 'Family of 4, Puebla',
        'testimonials.item2.content': 'I asked SMARTUR what to do with kids in the area. In 5 minutes I had a perfect itinerary: from Pico de Orizaba to an artisan chocolate shop in Córdoba.',
        'testimonials.item3.name': 'Sophie L.',
        'testimonials.item3.role': 'International tourist, France',
        'testimonials.item3.content': 'I told SMARTUR I wanted to find authentic coffee culture. It sent me to a small farm in Huatusco. The owners became like family. This is why travel exists.',

        // Contact
        'contact.label': 'Start here',
        'contact.title': 'What scent are you looking for today?',
        'contact.subtitle': 'Your personalized route starts with a question. Tell us about yourself and let the AI work its magic.',
        'contact.cta.button': 'Start my adventure',
        'contact.email.placeholder': 'your@email.com',
        'contact.name.placeholder': 'What is your name, traveler?',
        'contact.intro': 'Leave your email and we\'ll guide you to the smart recommendations form.',
        'contact.success': 'Perfect! Check your email to get started.',

        // FAQs
        'faqs.label': 'FAQ',
        'faqs.title': 'Frequently Asked Questions',
        'faq1.question': 'Is SMARTUR free for tourists?',
        'faq1.answer': 'Yes. SMARTUR is completely free for travelers. Our business model is based on supporting local SMEs, not charging you.',
        'faq2.question': 'How does SMARTUR personalize my recommendations?',
        'faq2.answer': 'We use Machine Learning algorithms that learn from your travel preferences, budget, interests, and context to suggest experiences you\'ll genuinely enjoy.',
        'faq3.question': 'Are the recommended businesses real and verified?',
        'faq3.answer': 'Absolutely. We work directly with SMEs from the Altas Montañas that are registered on our platform. We are not a generic aggregator.',
        'faq4.question': 'Can I use SMARTUR from my mobile app?',
        'faq4.answer': 'Yes. SMARTUR is available as a mobile app and also as a web platform. The same smart recommendations on any device.',
        'faq5.question': 'What if I don\'t like the recommendations?',
        'faq5.answer': 'Tell us and we\'ll improve. Every piece of feedback trains our AI better. You can refine your preferences at any time to get more tailored suggestions.',

        // Landing Map (VideoSection)
        'map.header.titleHtml': 'Discover the region of the <span style="color:var(--color-purple)">Altas Montañas</span>',
        'map.header.description': 'Explore the municipalities of the region through our high-precision interactive map.',
        'map.panel.title': 'Regional Map',
        'map.municipios': 'municipalities',
        'map.selection.prefix': 'Selected: ',
        'map.selection.none': 'No selection',
        'map.visualization.title': 'Visualization',
        'map.visualization.hint': 'Select a municipality to center the map with a cinematic view.',
        'map.actions.centerRegion': 'Center region',
        'map.actions.clearSelection': 'Clear selection',
        'map.popup.subtitle': 'Altas Montañas, Veracruz',

        // Landing Hero / Divider / ActionBridge / About
        'heroSection.titleHtml': 'AI that <span style="color: #ff4d8d">guides,</span><br/><span style="color: #4db9ca">tourism</span> that unites.',
        'heroSection.subtitle': 'Explore Veracruz\'s Altas Montañas with AI-crafted personalized routes.',
        'heroSection.cta': 'Start adventure',
        'heroSection.scrollIndicator': 'Discover',

        'flightDivider.line1': 'TRAVELING THE',
        'flightDivider.line2': 'PATH TOGETHER',

        'actionBridge.business.label': 'I\'m a Business',
        'actionBridge.business.description': 'Digitize your offer and reach more tourists with our AI.',
        'actionBridge.tourist.label': 'I\'m a Traveler',
        'actionBridge.tourist.description': 'Discover the perfect route designed just for you.',

        'about.sectionLabel': 'About SMARTUR',
        'about.headingPrefix': 'Powering the future of ',
        'about.headingHighlight': 'Regional Tourism',
        'about.subtitle': 'SMARTUR is the AI platform that won the Mi Veracruz Tourism Award 2024, designed to revolutionize the way we explore our mountains.',
        'about.award.badge': 'Veracruz',
        'about.award.title': 'Mi Veracruz Tourism Award',
        'about.award.year': '2024',

        'about.slide.mission.label': 'Our Mission',
        'about.slide.mission.text': 'Empower Altas Montañas MiPyMEs with accessible artificial intelligence, fostering fair and sustainable economic growth across the region.',
        'about.slide.vision.label': 'Our Vision',
        'about.slide.vision.text': 'Become Mexico\'s leading digital ecosystem for regional tourism, where technology and tradition come together to create unforgettable experiences.',
        'about.slide.values.label': 'Our Values',
        'about.slide.values.text': 'Purpose-driven innovation, transparency, commitment to the community, and excellence in every recommendation generated by our AI.',

        'about.timeline.item1.title': 'Contextual Analysis',
        'about.timeline.item1.text': 'Our AI processes regional data to understand each municipality\'s unique offering.',
        'about.timeline.item2.title': 'Direct Connection',
        'about.timeline.item2.text': 'We connect tourists with local businesses in a precise and personalized way.',
        'about.timeline.item3.title': 'Measurable Impact',
        'about.timeline.item3.text': 'We generate detailed reports on growth and tourism trends in the area.',
        'about.timeline.item4.title': 'Constant Evolution',
        'about.timeline.item4.text': 'We learn from every interaction to improve future routes and recommendations.',

        // PWA Info Cards / Modals (Landing)
        'pwa.info.company-values.title': 'Our DNA',
        'pwa.info.company-values.highlight': 'SMARTUR Values',
        'pwa.info.company-values.description': 'Transparency, responsible innovation, and regenerative tourism so every experience creates positive impact.',
        'pwa.info.pymes.title': 'SME Boost',
        'pwa.info.pymes.highlight': 'Supporting MiPyMEs',
        'pwa.info.pymes.description': 'We connect tourism ventures with travelers ready to discover genuine routes.',
        'pwa.info.ods.title': 'Aligned with SDGs',
        'pwa.info.ods.highlight': '2030 Agenda',
        'pwa.info.ods.description': 'Every recommendation prioritizes projects with a sustainable approach and respected communities.',
        'pwa.modal.understood': 'Got it',
        'pwa.modal.aboutLabel': 'About SMARTUR',
        'pwa.modal.title': 'Discover our essence',
        'pwa.modal.subtitle': 'Tap a card to see more detail.',

        // PWA Home (standalone)
        'pwaHome.logoutButton': 'Log out',
        'pwaHome.loginButton': 'Log in',
        'pwaHome.whereTop': 'Where to',
        'pwaHome.whereBottom': 'go?',
        'pwaHome.regionTop': 'Region',
        'pwaHome.regionBottom': 'Mountains',
        'pwaHome.essenceTop': 'Our',
        'pwaHome.essenceBottom': 'essence',

        // Footer
        'footer.slogan': 'Where AI finds your Veracruz',
        'footer.description': 'Intelligent tourism platform connecting travelers with authentic experiences in the Altas Montañas of Veracruz.',
        'footer.copyright': 'All rights reserved.',
    },
    fr: {
        // Navigation
        'nav.home': 'Accueil',
        'nav.howItWorks': 'Comment ça marche',
        'nav.region': 'La Région',
        'nav.technology': 'Technologie',
        'nav.impact': 'Impact',
        'nav.about': 'À propos',
        'nav.testimonials': 'Témoignages',
        'nav.faqs': 'FAQ',
        'nav.contact': 'Contact',
        'nav.start': 'Planifier mon voyage',

        // Accessibility
        'accessibility.changeLanguage': 'Changer de langue',
        'accessibility.toggleTheme': 'Basculer le thème',
        'accessibility.toggleMenu': 'Ouvrir le menu mobile',

        // Hero
        'hero.label': 'Altas Montañas • Veracruz • Mexique',
        'hero.title': 'Votre prochaine aventure\nvit dans la brume',
        'hero.subtitle': 'SMARTUR connaît les recoins que les cartes ne montrent pas. Dites-nous ce que vous cherchez et nous concevons un itinéraire sur mesure pour votre âme de voyageur.',
        'hero.cta': 'Découvrir mon itinéraire',
        'hero.cta.secondary': 'Voir comment ça marche',
        'hero.marquee.1': 'Café d\'altitude',
        'hero.marquee.2': 'Sentiers dans la brume',
        'hero.marquee.3': 'Culture Totonaque',
        'hero.marquee.4': 'Cascades cachées',
        'hero.marquee.5': 'Villages Magiques',
        'hero.marquee.6': 'Gastronomie authentique',

        // How it works
        'how.label': 'Comment ça marche',
        'how.title': 'Trois étapes. Une aventure parfaite.',
        'how.step1.title': 'Dites-nous qui vous êtes',
        'how.step1.text': 'Répondez à quelques questions sur vos goûts, votre budget et le type d\'expérience que vous recherchez.',
        'how.step2.title': 'Notre IA travaille',
        'how.step2.text': 'Des algorithmes de Machine Learning analysent des milliers d\'options réelles dans les Altas Montañas.',
        'how.step3.title': 'Découvrez et vivez',
        'how.step3.text': 'Recevez des recommandations d\'hôtels, restaurants et activités qui soutiennent les producteurs locaux.',

        // Impact
        'impact.label': 'Impact réel',
        'impact.title': 'Chaque voyage, une histoire qui transforme',
        'impact.subtitle': 'En utilisant SMARTUR, vous ne découvrez pas seulement une destination — vous contribuez directement à l\'économie des familles vénézuéliennes.',
        'impact.stat1.number': '100',
        'impact.stat1.suffix': '+',
        'impact.stat1.label': 'PME soutenues',
        'impact.stat2.number': '50',
        'impact.stat2.suffix': 'K+',
        'impact.stat2.label': 'Itinéraires générés',
        'impact.stat3.number': '15',
        'impact.stat3.suffix': '+',
        'impact.stat3.label': 'Municipalités couvertes',
        'impact.stat4.number': '98',
        'impact.stat4.suffix': '%',
        'impact.stat4.label': 'Voyageurs satisfaits',

        // Storytelling
        'story.hook.label': 'Le problème',
        'story.hook.title': 'Arrêtez de chercher.\nCommencez à trouver.',
        'story.hook.text': 'Des heures à sauter de blog en blog, des photos retouchées sur Instagram, toujours les mêmes endroits bondés.',
        'story.conflict.label': 'La vraie peur',
        'story.conflict.title': 'Ce n\'est pas de ne pas trouver d\'hôtel.\nC\'est de rentrer en se sentant touriste.',
        'story.conflict.text': 'Le voyageur moderne ne veut pas être un numéro. Il veut se connecter avec l\'essence des Altas Montañas.',
        'story.guide.label': 'La solution',
        'story.guide.title': 'Votre guide local.\nIntelligent et personnel.',
        'story.guide.text': 'SMARTUR comprend qu\'il n\'y a pas deux voyageurs identiques. Il ne vous donne pas une liste — il conçoit un itinéraire qui respire Veracruz.',
        'story.cta.label': 'Votre aventure commence ici',
        'story.cta.title': 'La première étape de votre voyage.',
        'story.cta.text': 'Dites-nous quel type d\'expérience vous recherchez. La magie commence quand SMARTUR vous connaît.',
        'story.cta.button': 'Personnaliser mon aventure maintenant',

        // Testimonials
        'testimonials.label': 'Témoignages',
        'testimonials.title': 'Ce que disent les voyageurs',
        'testimonials.item1.name': 'Andrea M.',
        'testimonials.item1.role': 'Voyageuse solo, Mexico',
        'testimonials.item1.content': 'Je n\'aurais jamais trouvé le chalet parmi les pins de Nogales seule. SMARTUR m\'y a emmenée exactement. Le café au lever du soleil fut le moment le plus authentique de ma vie.',
        'testimonials.item2.name': 'Carlos R.',
        'testimonials.item2.role': 'Famille de 4, Puebla',
        'testimonials.item2.content': 'J\'ai demandé à SMARTUR quoi faire avec des enfants dans la région. En 5 minutes, j\'avais un itinéraire parfait.',
        'testimonials.item3.name': 'Sophie L.',
        'testimonials.item3.role': 'Touriste internationale, France',
        'testimonials.item3.content': 'J\'ai dit à SMARTUR que je voulais trouver une culture authentique du café. Il m\'a envoyée dans une petite ferme à Huatusco. Les propriétaires sont devenus comme une famille.',

        // Contact
        'contact.label': 'Commencez ici',
        'contact.title': 'Quel arôme cherchez-vous aujourd\'hui?',
        'contact.subtitle': 'Votre itinéraire personnalisé commence par une question. Parlez-nous de vous.',
        'contact.cta.button': 'Commencer mon aventure',
        'contact.email.placeholder': 'votre@email.com',
        'contact.name.placeholder': 'Quel est votre nom, voyageur?',
        'contact.intro': 'Laissez votre email et nous vous guiderons vers le formulaire de recommandations intelligentes.',
        'contact.success': 'Parfait! Vérifiez votre email pour commencer.',

        // FAQs
        'faqs.label': 'FAQ',
        'faqs.title': 'Questions Fréquentes',
        'faq1.question': 'SMARTUR est-il gratuit pour les touristes?',
        'faq1.answer': 'Oui. SMARTUR est entièrement gratuit pour les voyageurs.',
        'faq2.question': 'Comment SMARTUR personnalise mes recommandations?',
        'faq2.answer': 'Nous utilisons des algorithmes de Machine Learning qui apprennent de vos préférences de voyage.',
        'faq3.question': 'Les entreprises recommandées sont-elles réelles?',
        'faq3.answer': 'Absolument. Nous travaillons directement avec des PME des Altas Montañas.',
        'faq4.question': 'Puis-je utiliser SMARTUR depuis mon application mobile?',
        'faq4.answer': 'Oui. SMARTUR est disponible en application mobile et en plateforme web.',
        'faq5.question': 'Et si je n\'aime pas les recommandations?',
        'faq5.answer': 'Dites-le nous et nous améliorerons. Chaque retour entraîne mieux notre IA.',

        // Landing Map (VideoSection)
        'map.header.titleHtml': 'Découvrez la région des <span style="color:var(--color-purple)">Altas Montañas</span>',
        'map.header.description': 'Explorez les municipalités de la région grâce à notre carte interactive haute précision.',
        'map.panel.title': 'Carte régionale',
        'map.municipios': 'municipalités',
        'map.selection.prefix': 'Sélection : ',
        'map.selection.none': 'Aucune sélection',
        'map.visualization.title': 'Visualisation',
        'map.visualization.hint': 'Sélectionnez une municipalité pour centrer la carte avec une vue cinématographique.',
        'map.actions.centerRegion': 'Centrer la région',
        'map.actions.clearSelection': 'Effacer la sélection',
        'map.popup.subtitle': 'Altas Montañas, Veracruz',

        // Landing Hero / Divider / ActionBridge / About
        'heroSection.titleHtml': 'IA qui <span style="color: #ff4d8d">guide,</span><br/><span style="color: #4db9ca">tourisme</span> qui unit.',
        'heroSection.subtitle': 'Explorez les Altas Montañas du Veracruz avec des itinéraires personnalisés conçus par IA.',
        'heroSection.cta': 'Commencer l\'aventure',
        'heroSection.scrollIndicator': 'Découvrir',

        'flightDivider.line1': 'PARCOURANT LE',
        'flightDivider.line2': 'CHEMIN ENSEMBLE',

        'actionBridge.business.label': 'Je suis une entreprise',
        'actionBridge.business.description': 'Numérisez votre offre et touchez plus de touristes grâce à notre IA.',
        'actionBridge.tourist.label': 'Je suis un voyageur',
        'actionBridge.tourist.description': 'Découvrez l\'itinéraire parfait pensé pour vous.',

        'about.sectionLabel': 'À propos de SMARTUR',
        'about.headingPrefix': 'Propulser l\'avenir du ',
        'about.headingHighlight': 'Tourisme régional',
        'about.subtitle': 'SMARTUR est la plateforme d\'IA lauréate du prix touristique Mi Veracruz 2024, conçue pour révolutionner la façon dont nous explorons nos montagnes.',
        'about.award.badge': 'Veracruz',
        'about.award.title': 'Prix touristique Mi Veracruz',
        'about.award.year': '2024',

        'about.slide.mission.label': 'Notre mission',
        'about.slide.mission.text': 'Autonomiser les MiPyMEs des Altas Montañas grâce à une intelligence artificielle accessible, en favorisant une croissance économique équitable et durable dans la région.',
        'about.slide.vision.label': 'Notre vision',
        'about.slide.vision.text': 'Devenir l\'écosystème digital leader au Mexique pour le tourisme régional, où technologie et tradition s\'unissent pour créer des expériences inoubliables.',
        'about.slide.values.label': 'Nos valeurs',
        'about.slide.values.text': 'Innovation porteuse de sens, transparence, engagement envers la communauté et excellence dans chaque recommandation générée par notre IA.',

        'about.timeline.item1.title': 'Analyse contextuelle',
        'about.timeline.item1.text': 'Notre IA traite les données régionales pour comprendre l\'offre unique de chaque municipalité.',
        'about.timeline.item2.title': 'Connexion directe',
        'about.timeline.item2.text': 'Nous mettons en relation les voyageurs et les entreprises locales de manière précise et personnalisée.',
        'about.timeline.item3.title': 'Impact mesurable',
        'about.timeline.item3.text': 'Nous générons des rapports détaillés sur la croissance et les tendances du tourisme dans la zone.',
        'about.timeline.item4.title': 'Évolution constante',
        'about.timeline.item4.text': 'Nous apprenons de chaque interaction pour améliorer les itinéraires et recommandations à venir.',

        // PWA Info Cards / Modals (Landing)
        'pwa.info.company-values.title': 'Notre ADN',
        'pwa.info.company-values.highlight': 'Valeurs SMARTUR',
        'pwa.info.company-values.description': 'Transparence, innovation responsable et tourisme régénératif pour que chaque expérience génère un impact positif.',
        'pwa.info.pymes.title': 'Impulsion aux PME',
        'pwa.info.pymes.highlight': 'Soutenir les MiPyMEs',
        'pwa.info.pymes.description': 'Nous connectons des entreprises touristiques à des voyageurs prêts à découvrir des itinéraires authentiques.',
        'pwa.info.ods.title': 'Alignés sur les ODD',
        'pwa.info.ods.highlight': 'Agenda 2030',
        'pwa.info.ods.description': 'Chaque recommandation priorise des projets axés sur le développement durable et des communautés respectées.',
        'pwa.modal.understood': 'Compris',
        'pwa.modal.aboutLabel': 'A propos de SMARTUR',
        'pwa.modal.title': 'Découvrez notre essence',
        'pwa.modal.subtitle': 'Touchez une carte pour voir plus de détails.',

        // PWA Home (standalone)
        'pwaHome.logoutButton': 'Se déconnecter',
        'pwaHome.loginButton': 'Se connecter',
        'pwaHome.whereTop': 'Où aller',
        'pwaHome.whereBottom': 'allons-nous ?',
        'pwaHome.regionTop': 'Région',
        'pwaHome.regionBottom': 'Montagnes',
        'pwaHome.essenceTop': 'Notre',
        'pwaHome.essenceBottom': 'essence',

        // Footer
        'footer.slogan': 'Où l\'IA trouve votre Veracruz',
        'footer.description': 'Plateforme de tourisme intelligent connectant les voyageurs avec des expériences authentiques dans les Altas Montañas de Veracruz.',
        'footer.copyright': 'Tous droits réservés.',
    },
};

interface LanguageContextType {
    lang: LanguageCode;
    changeLanguage: (newLang: string) => void;
    t: (key: string) => string;
    isReady: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lang, setLang] = useState<LanguageCode>(defaultLang);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const storedLang = localStorage.getItem('smartur-lang') as LanguageCode;
        if (storedLang && storedLang in languages) {
            setLang(storedLang);
        }
        setIsReady(true);
    }, []);

    const changeLanguage = (newLang: string) => {
        if (newLang in languages) {
            setLang(newLang as LanguageCode);
            localStorage.setItem('smartur-lang', newLang);
            document.documentElement.lang = newLang;
        }
    };

    const t = (key: string) => ui[lang]?.[key] || key;

    return <LanguageContext.Provider value={{ lang, changeLanguage, t, isReady }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
