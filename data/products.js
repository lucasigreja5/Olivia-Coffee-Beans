(function () {
  'use strict';

  var products = [
    {
      id: 'starter-pack',
      sku: 'OCB-ESP-001',
      name: {
        en: 'Eco-First Espresso Starter Pack',
        'pt-BR': 'Kit Inicial Espresso Eco-First'
      },
      origin: {
        en: 'Cerrado Mineiro, MG',
        'pt-BR': 'Cerrado Mineiro, MG'
      },
      category: 'espresso',
      featured: true,
      fixedSize: false,
      defaultSize: '250g',
      image: 'assets/coffee-bag.png',
      isKraftOverlay: true,
      priceUsd: 24.00,
      priceBrl: 119.00,
      roastType: 'medium-dark',
      roastLevel: 4,
      roastLabel: {
        en: 'Medium-Dark',
        'pt-BR': 'Média-Escura'
      },
      altitude: '1,150m',
      process: {
        en: 'Natural Sun-Dried',
        'pt-BR': 'Natural Seco ao Sol'
      },
      tastingNotes: {
        en: ['Dark Chocolate', 'Toasted Hazelnut', 'Caramel Crema'],
        'pt-BR': ['Chocolate Amargo', 'Avelã Torrada', 'Crema de Caramelo']
      },
      badge: {
        en: 'Flagship',
        'pt-BR': 'Carro-Chefe'
      },
      shortDescription: {
        en: 'Everything you need to start brewing velvety, carbon-neutral espresso at home.',
        'pt-BR': 'Tudo o que você precisa para preparar um espresso aveludado e carbono neutro em casa.'
      },
      description: {
        en: 'Our signature Cerrado Mineiro blend roasted in solar-powered small batches for thick crema, balanced sweetness, and zero bitterness. Packaged in 100% home-compostable kraft bags.',
        'pt-BR': 'Nosso blend exclusivo do Cerrado Mineiro torrado em pequenos lotes com energia solar para crema densa, doçura equilibrada e zero amargor. Embalado em pacotes kraft 100% compostáveis.'
      },
      lotMetadata: {
        farm: 'Fazenda Boa Esperança',
        harvestDate: '2026-06',
        roastDate: '2026-11-20',
        wagePremiumPct: 38,
        co2OffsetKg: 1.4
      }
    },
    {
      id: 'cerrado-gold',
      sku: 'OCB-ESP-002',
      name: {
        en: 'Cerrado Gold Espresso',
        'pt-BR': 'Espresso Ouro do Cerrado'
      },
      origin: {
        en: 'Patrocínio, MG',
        'pt-BR': 'Patrocínio, MG'
      },
      category: 'espresso',
      featured: true,
      fixedSize: false,
      defaultSize: '250g',
      image: 'assets/product-cerrado-gold.png',
      isKraftOverlay: false,
      priceUsd: 22.00,
      priceBrl: 109.00,
      roastType: 'medium-dark',
      roastLevel: 4,
      roastLabel: {
        en: 'Medium-Dark',
        'pt-BR': 'Média-Escura'
      },
      altitude: '1,100m',
      process: {
        en: 'Pulped Natural',
        'pt-BR': 'Cereja Descascado'
      },
      tastingNotes: {
        en: ['Roasted Almond', 'Brown Sugar', 'Milk Chocolate'],
        'pt-BR': ['Amêndoa Torrada', 'Açúcar Mascavo', 'Chocolate ao Leite']
      },
      badge: {
        en: 'Best Seller',
        'pt-BR': 'Mais Vendido'
      },
      shortDescription: {
        en: 'Syrupy body and sweet nutty depth crafted for classic espresso and milk drinks.',
        'pt-BR': 'Corpo licoroso e doçura de castanhas pensado para espresso clássico e bebidas com leite.'
      },
      description: {
        en: 'Grown on volcanic plateaus in Patrocínio at 1,100m, this Yellow Bourbon lot delivers rich sweetness that shines both as a straight shot and layered into cappuccinos or flat whites.',
        'pt-BR': 'Cultivado nos chapadões de Patrocínio a 1.100m de altitude, este lote de Bourbon Amarelo entrega doçura marcante tanto no espresso puro quanto com leite vaporizado.'
      },
      lotMetadata: {
        farm: 'Sítio Serra Negra',
        harvestDate: '2026-07',
        roastDate: '2026-11-21',
        wagePremiumPct: 35,
        co2OffsetKg: 1.2
      }
    },
    {
      id: 'serra-verde',
      sku: 'OCB-SOG-003',
      name: {
        en: 'Serra Verde Single-Origin',
        'pt-BR': 'Serra Verde Origem Única'
      },
      origin: {
        en: 'Sul de Minas, MG',
        'pt-BR': 'Sul de Minas, MG'
      },
      category: 'single-origin',
      featured: true,
      fixedSize: false,
      defaultSize: '250g',
      image: 'assets/product-serra-verde.png',
      isKraftOverlay: false,
      priceUsd: 25.00,
      priceBrl: 124.00,
      roastType: 'medium',
      roastLevel: 3,
      roastLabel: {
        en: 'Medium',
        'pt-BR': 'Média'
      },
      altitude: '1,320m',
      process: {
        en: 'Washed & Shade-Grown',
        'pt-BR': 'Lavado e Sombreado'
      },
      tastingNotes: {
        en: ['Tangerine Zest', 'Panela Cane', 'Wildflower Honey'],
        'pt-BR': ['Casca de Tangerina', 'Rapadura', 'Mel Silvestre']
      },
      badge: {
        en: 'Single Origin',
        'pt-BR': 'Origem Única'
      },
      shortDescription: {
        en: 'Bright citrus aromatics and silky honey sweetness from high-elevation Minas mountains.',
        'pt-BR': 'Aromas cítricos brilhantes e doçura sedosa de mel das montanhas do Sul de Minas.'
      },
      description: {
        en: 'Cultivated under native Atlantic Forest canopy by third-generation women growers in Carmo de Minas. Roasted medium to preserve crisp citrus clarity and floral complexity.',
        'pt-BR': 'Cultivado sob a copa nativa da Mata Atlântica por produtoras de terceira geração em Carmo de Minas. Torra média para preservar acidez cítrica limpa e notas florais.'
      },
      lotMetadata: {
        farm: 'Cooperativa Vale das Flores',
        harvestDate: '2026-08',
        roastDate: '2026-11-22',
        wagePremiumPct: 42,
        co2OffsetKg: 1.2
      }
    },
    {
      id: 'chapada-decaf',
      sku: 'OCB-DCF-004',
      name: {
        en: 'Chapada Honey Decaf',
        'pt-BR': 'Descafeinado Mel da Chapada'
      },
      origin: {
        en: 'Chapada Diamantina, BA',
        'pt-BR': 'Chapada Diamantina, BA'
      },
      category: 'decaf',
      featured: false,
      fixedSize: false,
      defaultSize: '250g',
      image: 'assets/product-chapada-decaf.png',
      isKraftOverlay: false,
      priceUsd: 23.00,
      priceBrl: 114.00,
      roastType: 'light-medium',
      roastLevel: 2,
      roastLabel: {
        en: 'Light-Medium',
        'pt-BR': 'Clara-Média'
      },
      altitude: '1,240m',
      process: {
        en: 'Honey & Sugarcane EA Decaf',
        'pt-BR': 'Mel & Descafeinação Natural por Cana'
      },
      tastingNotes: {
        en: ['Stone Fruit', 'Sweet Molasses', 'Toasted Oat'],
        'pt-BR': ['Frutas de Caroço', 'Melado Suave', 'Aveia Tostada']
      },
      badge: {
        en: 'Chemical-Free Decaf',
        'pt-BR': 'Descaf. Natural'
      },
      shortDescription: {
        en: 'All the warmth and orchard-fruit sweetness of Bahia specialty coffee, minus the caffeine.',
        'pt-BR': 'Toda a doçura frutada e aconchego do café especial baiano, sem cafeína.'
      },
      description: {
        en: 'Naturally decaffeinated using fermented sugarcane ethyl acetate so delicate stone-fruit and honey sugars stay intact. Ideal for evening pour-overs or late-night espresso.',
        'pt-BR': 'Descafeinado naturalmente com acetato de etila de cana-de-açúcar fermentada, preservando as notas delicadas de frutas amarelas e mel para qualquer hora do dia ou da noite.'
      },
      lotMetadata: {
        farm: 'Fazenda Pedra Branca',
        harvestDate: '2026-07',
        roastDate: '2026-11-21',
        wagePremiumPct: 40,
        co2OffsetKg: 1.3
      }
    },
    {
      id: 'discovery-flight',
      sku: 'OCB-BND-005',
      name: {
        en: "Roaster's Discovery Flight (3x150g)",
        'pt-BR': 'Kit Degustação do Torrador (3x150g)'
      },
      origin: {
        en: 'Multi-Region Brazil',
        'pt-BR': 'Multirregional Brasil'
      },
      category: 'bundle',
      featured: false,
      fixedSize: true,
      defaultSize: '450g',
      fixedSizeLabel: {
        en: '3 x 150g (450g Set)',
        'pt-BR': '3 x 150g (Kit 450g)'
      },
      image: 'assets/product-discovery-flight.png',
      isKraftOverlay: false,
      priceUsd: 36.00,
      priceBrl: 179.00,
      roastType: 'assorted',
      roastLevel: 3,
      roastLabel: {
        en: 'Assorted (Light-Med to Med-Dark)',
        'pt-BR': 'Variado (Clara-Média a Média-Escura)'
      },
      altitude: '1,100–1,320m',
      process: {
        en: 'Natural, Pulped Natural & Washed',
        'pt-BR': 'Natural, Cereja Descascado & Lavado'
      },
      tastingNotes: {
        en: ['Dark Cocoa', 'Bright Citrus', 'Caramelized Honey'],
        'pt-BR': ['Cacau Intenso', 'Cítrico Vibrante', 'Mel Caramelizado']
      },
      badge: {
        en: 'Gift Set',
        'pt-BR': 'Kit Presente'
      },
      shortDescription: {
        en: 'Three curated 150g mini kraft pouches spanning Cerrado Mineiro, Sul de Minas, and Bahia.',
        'pt-BR': 'Três minipacotes kraft de 150g explorando Cerrado Mineiro, Sul de Minas e Chapada Diamantina.'
      },
      description: {
        en: 'Explore Brazil’s premier specialty terroirs side by side. Includes Cerrado Gold Espresso, Serra Verde Single-Origin, and Chapada Honey Decaf in a zero-plastic gift box.',
        'pt-BR': 'Explore os principais terroirs especiais do Brasil lado a lado. Inclui Espresso Ouro do Cerrado, Serra Verde Origem Única e Descafeinado Mel da Chapada em caixa presenteável sem plástico.'
      },
      lotMetadata: {
        farm: 'Olívia Partner Collectives (MG & BA)',
        harvestDate: '2026-07',
        roastDate: '2026-11-22',
        wagePremiumPct: 38,
        co2OffsetKg: 1.8
      }
    }
  ];

  var sizes = [
    {
      id: '250g',
      weightGrams: 250,
      multiplier: 1.0,
      label: {
        en: '250g',
        'pt-BR': '250g'
      },
      sublabel: {
        en: '~15 cups',
        'pt-BR': '~15 xícaras'
      }
    },
    {
      id: '500g',
      weightGrams: 500,
      multiplier: 1.85,
      label: {
        en: '500g',
        'pt-BR': '500g'
      },
      sublabel: {
        en: '~30 cups (Save 7.5%)',
        'pt-BR': '~30 xícaras (7,5% OFF)'
      }
    },
    {
      id: '1kg',
      weightGrams: 1000,
      multiplier: 3.4,
      label: {
        en: '1kg',
        'pt-BR': '1kg'
      },
      sublabel: {
        en: '~60 cups (Save 15%)',
        'pt-BR': '~60 xícaras (15% OFF)'
      }
    }
  ];

  var grinds = [
    {
      id: 'whole-bean',
      label: {
        en: 'Whole Bean',
        'pt-BR': 'Em Grãos'
      },
      hint: {
        en: 'Peak aroma when ground fresh',
        'pt-BR': 'Máximo aroma moído na hora'
      }
    },
    {
      id: 'espresso',
      label: {
        en: 'Espresso',
        'pt-BR': 'Espresso (Fina)'
      },
      hint: {
        en: 'Fine grind for portafilters & Moka',
        'pt-BR': 'Moagem fina para máquina e Moka'
      }
    },
    {
      id: 'pour-over',
      label: {
        en: 'Pour-Over',
        'pt-BR': 'Coado (Média)'
      },
      hint: {
        en: 'Medium grind for V60, Melitta & Chemex',
        'pt-BR': 'Moagem média para V60, coador e Chemex'
      }
    },
    {
      id: 'french-press',
      label: {
        en: 'French Press',
        'pt-BR': 'Prensa Francesa (Grossa)'
      },
      hint: {
        en: 'Coarse grind for immersion brewing',
        'pt-BR': 'Moagem grossa para infusão'
      }
    }
  ];

  var cadences = [
    {
      id: 'one-time',
      discountPct: 0,
      isSubscription: false,
      intervalDays: 0,
      label: {
        en: 'One-Time Purchase',
        'pt-BR': 'Compra Única'
      },
      badge: null
    },
    {
      id: 'biweekly',
      discountPct: 15,
      isSubscription: true,
      intervalDays: 14,
      label: {
        en: 'Every 2 Weeks',
        'pt-BR': 'A Cada 2 Semanas'
      },
      badge: {
        en: 'Save 15% + Free Shipping',
        'pt-BR': '15% OFF + Frete Grátis'
      }
    },
    {
      id: 'monthly',
      discountPct: 15,
      isSubscription: true,
      intervalDays: 30,
      label: {
        en: 'Monthly',
        'pt-BR': 'Mensal'
      },
      badge: {
        en: 'Save 15% + Free Shipping',
        'pt-BR': '15% OFF + Frete Grátis'
      }
    }
  ];

  var promos = {
    OLIVIA15: {
      code: 'OLIVIA15',
      type: 'percent',
      discountPct: 15,
      freeShipping: false,
      label: {
        en: '15% off order subtotal',
        'pt-BR': '15% de desconto no subtotal'
      }
    },
    BEMVINDO15: {
      code: 'BEMVINDO15',
      type: 'percent',
      discountPct: 15,
      freeShipping: false,
      label: {
        en: '15% welcome discount',
        'pt-BR': '15% de desconto de boas-vindas'
      }
    },
    FREESHIP: {
      code: 'FREESHIP',
      type: 'shipping',
      discountPct: 0,
      freeShipping: true,
      label: {
        en: 'Free carbon-neutral shipping',
        'pt-BR': 'Frete grátis carbono neutro'
      }
    }
  };

  var shipping = {
    freeThresholdUsd: 50.00,
    freeThresholdBrl: 240.00,
    standardUsd: 5.90,
    standardBrl: 24.90,
    freeOnSubscription: true
  };

  var reviews = [
    {
      id: 'rev-1',
      author: 'Camila Andrade',
      location: 'Belo Horizonte, MG',
      rating: 5,
      verified: true,
      productId: 'starter-pack',
      productName: {
        en: 'Eco-First Espresso Starter Pack',
        'pt-BR': 'Kit Inicial Espresso Eco-First'
      },
      date: '2026-11-12',
      title: {
        en: 'Tiger-striped crema without the guilt',
        'pt-BR': 'Crema impecável e consciência tranquila'
      },
      quote: {
        en: 'I switched our home espresso machine to the Starter Pack two months ago. Thick hazelnut crema every morning, and knowing the pouch goes straight into our compost bin makes it taste even better.',
        'pt-BR': 'Troquei o café da nossa máquina de espresso pelo Kit Inicial há dois meses. Crema de avelã densa toda manhã, e saber que o pacote vai direto para a composteira torna tudo ainda melhor.'
      }
    },
    {
      id: 'rev-2',
      author: 'Marcus Vance',
      location: 'Portland, OR',
      rating: 5,
      verified: true,
      productId: 'serra-verde',
      productName: {
        en: 'Serra Verde Single-Origin',
        'pt-BR': 'Serra Verde Origem Única'
      },
      date: '2026-11-05',
      title: {
        en: 'Bright tangerine clarity on V60',
        'pt-BR': 'Acidez cítrica brilhante na V60'
      },
      quote: {
        en: 'Serra Verde is effortlessly sweet on pour-over. Zero astringency as it cools, just clean tangerine zest and wildflower honey. The farm transparency report is a refreshing standard.',
        'pt-BR': 'O Serra Verde é naturalmente doce no método coado. Zero adstringência quando esfria, apenas tangerina limpa e mel silvestre. A rastreabilidade direta da fazenda faz toda a diferença.'
      }
    },
    {
      id: 'rev-3',
      author: 'Sofia & Rafael M.',
      location: 'São Paulo, SP',
      rating: 5,
      verified: true,
      productId: 'chapada-decaf',
      productName: {
        en: 'Chapada Honey Decaf',
        'pt-BR': 'Descafeinado Mel da Chapada'
      },
      date: '2026-10-28',
      title: {
        en: 'Finally a decaf that tastes like specialty coffee',
        'pt-BR': 'Finalmente um descafeinado com sabor de café especial'
      },
      quote: {
        en: 'Most decafs taste hollow, but Chapada Honey Decaf has real body and sweet molasses notes. We subscribed monthly so we never run out for after-dinner cups.',
        'pt-BR': 'A maioria dos descafeinados parece aguada, mas o Mel da Chapada tem corpo de verdade e doçura de melado. Assinamos o plano mensal para nunca faltar depois do jantar.'
      }
    }
  ];

  var brewGuides = [
    {
      id: 'espresso',
      method: {
        en: 'Espresso',
        'pt-BR': 'Espresso'
      },
      tagline: {
        en: 'Rich, syrupy crema with dark chocolate depth',
        'pt-BR': 'Crema densa e licorosa com notas de chocolate amargo'
      },
      recommendedSku: 'starter-pack',
      dose: {
        en: '18g in / 36g out',
        'pt-BR': '18g pó / 36g bebida'
      },
      grind: {
        en: 'Fine (table salt)',
        'pt-BR': 'Fina (sal refinado)'
      },
      temp: {
        en: '93°C (200°F)',
        'pt-BR': '93°C (200°F)'
      },
      time: {
        en: '27–30 sec',
        'pt-BR': '27–30 seg'
      },
      steps: {
        en: [
          'Preheat your portafilter, dose 18g of finely ground beans, and tamp evenly with firm, level pressure.',
          'Lock in and start extraction immediately, aiming for a warm honey-like flow after 5–7 seconds.',
          'Stop the shot at 36g liquid yield (around 28 seconds) for balanced sweetness and velvety crema.'
        ],
        'pt-BR': [
          'Pré-aqueça o porta-filtro, dose 18g de café moído fino e compacte com pressão firme e nivelada.',
          'Encaixe e inicie a extração imediatamente, buscando um fluxo contínuo em fio após 5 a 7 segundos.',
          'Interrompa a extração ao atingir 36g na xícara (cerca de 28 segundos) para equilíbrio e crema aveludada.'
        ]
      }
    },
    {
      id: 'pour-over',
      method: {
        en: 'Pour-Over',
        'pt-BR': 'Coado (V60)'
      },
      tagline: {
        en: 'Crisp floral clarity and sweet citrus aromatics',
        'pt-BR': 'Clareza floral e aromas cítricos adocicados'
      },
      recommendedSku: 'serra-verde',
      dose: {
        en: '18g coffee / 300ml water',
        'pt-BR': '18g café / 300ml água'
      },
      grind: {
        en: 'Medium (kosher salt)',
        'pt-BR': 'Média (areia fina)'
      },
      temp: {
        en: '94°C (201°F)',
        'pt-BR': '94°C (201°F)'
      },
      time: {
        en: '2:45–3:15 min',
        'pt-BR': '2:45–3:15 min'
      },
      steps: {
        en: [
          'Rinse the paper filter with hot water, add 18g medium-ground coffee, and bloom with 45ml water for 40 seconds.',
          'Pour slowly in concentric circles up to 180ml by 1:15, keeping the water bed steady without splashing the edges.',
          'Finish pouring up to 300ml by 1:50 and let the drawdown complete cleanly around 3 minutes.'
        ],
        'pt-BR': [
          'Escalde o filtro de papel com água quente, adicione 18g de café moído médio e faça a pré-infusão com 45ml por 40 segundos.',
          'Despeje a água em círculos suaves até 180ml por volta de 1:15, mantendo o fluxo constante no centro.',
          'Complete até 300ml aos 1:50 e aguarde a filtragem terminar por completo perto dos 3 minutos.'
        ]
      }
    },
    {
      id: 'french-press',
      method: {
        en: 'French Press',
        'pt-BR': 'Prensa Francesa'
      },
      tagline: {
        en: 'Full-bodied comfort with lingering caramel sweetness',
        'pt-BR': 'Corpo intenso e doçura prolongada de caramelo'
      },
      recommendedSku: 'cerrado-gold',
      dose: {
        en: '30g coffee / 500ml water',
        'pt-BR': '30g café / 500ml água'
      },
      grind: {
        en: 'Coarse (sea salt)',
        'pt-BR': 'Grossa (sal grosso)'
      },
      temp: {
        en: '95°C (203°F)',
        'pt-BR': '95°C (203°F)'
      },
      time: {
        en: '4:00 min',
        'pt-BR': '4:00 min'
      },
      steps: {
        en: [
          'Add 30g coarsely ground coffee to a warmed French Press and pour 500ml hot water to saturate all grounds.',
          'Place the lid on without plunging and steep for 4 minutes so aromatic oils fully infuse.',
          'Gently stir the top crust, press the plunger smoothly to the bottom, and decant immediately.'
        ],
        'pt-BR': [
          'Coloque 30g de café moído grosso na prensa aquecida e despeje 500ml de água quente umedecendo todo o pó.',
          'Encaixe a tampa sem abaixar o êmbolo e aguarde 4 minutos para extração completa dos óleos aromáticos.',
          'Misture suavemente a crosta superior, pressione o êmbolo devagar até o fundo e sirva imediatamente.'
        ]
      }
    }
  ];

  var faqs = [
    {
      id: 'faq-freshness',
      question: {
        en: 'How fresh are the beans when they ship?',
        'pt-BR': 'Qual é o frescor dos grãos no envio?'
      },
      answer: {
        en: 'Every bag is roasted to order in solar-powered small batches and shipped within 48 hours of roasting. Each pouch carries the exact farm, harvest, and roast date.',
        'pt-BR': 'Todos os pacotes são torrados sob demanda em pequenos lotes com energia solar e despachados em até 48 horas após a torra, com data de colheita e torra no rótulo.'
      }
    },
    {
      id: 'faq-grind',
      question: {
        en: 'Which grind size should I choose?',
        'pt-BR': 'Qual moagem devo escolher para o meu método?'
      },
      answer: {
        en: 'Choose Whole Bean if you have a burr grinder at home for peak aroma. Otherwise select Espresso (fine) for espresso machines and Moka pots, Pour-Over (medium) for V60/Melitta filters, or French Press (coarse) for immersion brewers.',
        'pt-BR': 'Escolha Em Grãos se você tiver moedor em casa para preservar o aroma máximo. Caso contrário, selecione Espresso (fina) para máquinas e cafeteira italiana, Coado (média) para V60 e filtros de papel, ou Prensa Francesa (grossa) para infusão.'
      }
    },
    {
      id: 'faq-subscription',
      question: {
        en: 'How do subscriptions and free shipping work?',
        'pt-BR': 'Como funcionam a assinatura e o frete grátis?'
      },
      answer: {
        en: 'Biweekly and monthly subscriptions save 15% on every bag and automatically unlock free carbon-neutral shipping—no minimum order needed. One-time orders also ship free over $50.00 (R$ 240,00) or with code FREESHIP.',
        'pt-BR': 'As assinaturas quinzenal e mensal garantem 15% de desconto em cada pacote e liberam frete grátis carbono neutro automaticamente, sem pedido mínimo. Compras únicas também ganham frete grátis acima de R$ 240,00 ($50.00) ou com o cupom FREESHIP.'
      }
    },
    {
      id: 'faq-sustainability',
      question: {
        en: 'Are your bags really compostable and carbon-neutral?',
        'pt-BR': 'As embalagens são mesmo compostáveis e a operação é carbono neutro?'
      },
      answer: {
        en: 'Yes. Our kraft pouches and degassing valves are 100% plant-based and home-compostable, and 100% of roasting and shipping emissions are offset through regenerative agroforestry projects in Minas Gerais and Bahia.',
        'pt-BR': 'Sim. Nossos pacotes kraft e válvulas são 100% de origem vegetal e compostáveis, e todas as emissões da torra e entrega são compensadas por projetos agroflorestais regenerativos em Minas Gerais e na Bahia.'
      }
    },
    {
      id: 'faq-equity',
      question: {
        en: 'What does direct-trade mean for the farmers?',
        'pt-BR': 'O que o comércio direto significa na prática para os produtores?'
      },
      answer: {
        en: 'By partnering directly with family farms and cooperatives in Brazil without middlemen, growers earn 35% to 42% above commodity benchmarks, plus a portion of every purchase funds rural schools and clean water access.',
        'pt-BR': 'Ao comprar diretamente de fazendas familiares e cooperativas brasileiras sem intermediários, pagamos de 35% a 42% acima do mercado tradicional, além de destinar parte de cada venda para escolas rurais e água limpa.'
      }
    }
  ];

  window.OCB_CATALOG = {
    products: products,
    grinds: grinds,
    sizes: sizes,
    cadences: cadences,
    promos: promos,
    shipping: shipping,
    reviews: reviews,
    brewGuides: brewGuides,
    faqs: faqs
  };
})();
