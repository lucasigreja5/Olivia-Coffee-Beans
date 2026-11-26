(function () {
  'use strict';

  var quizSteps = [
    {
      id: 'brewMethod',
      question: {
        en: 'How do you usually brew your coffee at home?',
        'pt-BR': 'Como você costuma preparar seu café em casa?'
      },
      subtitle: {
        en: 'We match roast development and grind precision directly to your brewer.',
        'pt-BR': 'Ajustamos o perfil de torra e a moagem exatamente para o seu método.'
      },
      options: [
        {
          id: 'espresso',
          icon: 'espresso',
          label: {
            en: 'Espresso Machine or Moka Pot',
            'pt-BR': 'Máquina de Espresso ou Cafeteira Italiana'
          },
          hint: {
            en: 'Rich crema, concentrated shot, or creamy milk drinks',
            'pt-BR': 'Crema densa, extração intensa ou bebidas com leite'
          }
        },
        {
          id: 'pour-over',
          icon: 'pour-over',
          label: {
            en: 'Pour-Over (V60, Melitta, or Drip)',
            'pt-BR': 'Café Coado (V60, Melitta ou Cafeteira)'
          },
          hint: {
            en: 'Clean, aromatic cup ready in under 3 minutes',
            'pt-BR': 'Xícara limpa e aromática pronta em menos de 3 minutos'
          }
        },
        {
          id: 'french-press',
          icon: 'french-press',
          label: {
            en: 'French Press or Immersion',
            'pt-BR': 'Prensa Francesa ou Infusão'
          },
          hint: {
            en: 'Full-bodied texture with effortless steep-and-press flow',
            'pt-BR': 'Corpo marcante com preparo prático de infusão'
          }
        },
        {
          id: 'multi-brew',
          icon: 'compass',
          label: {
            en: 'Multiple Brewers or Gifting',
            'pt-BR': 'Vários Métodos ou Presente'
          },
          hint: {
            en: 'Versatile tasting experience across Brazilian terroirs',
            'pt-BR': 'Experiência versátil explorando diferentes terroirs brasileiros'
          }
        }
      ]
    },
    {
      id: 'flavorProfile',
      question: {
        en: 'Which flavor notes sound best in your cup?',
        'pt-BR': 'Quais notas sensoriais combinam mais com o seu paladar?'
      },
      subtitle: {
        en: 'Every Olívia roast is 100% Brazilian Arabica with zero artificial additives.',
        'pt-BR': 'Todas as torras da Olívia são 100% Arábica brasileiro, sem aditivos.'
      },
      options: [
        {
          id: 'chocolate-nutty',
          icon: 'cocoa',
          label: {
            en: 'Dark Chocolate, Caramel & Toasted Nuts',
            'pt-BR': 'Chocolate Amargo, Caramelo e Castanhas'
          },
          hint: {
            en: 'Classic comforting sweetness with velvety low acidity',
            'pt-BR': 'Doçura clássica e reconfortante com acidez baixa e aveludada'
          }
        },
        {
          id: 'bright-citrus',
          icon: 'citrus',
          label: {
            en: 'Tangerine Zest & Wildflower Honey',
            'pt-BR': 'Tangerina Fresca e Mel Silvestre'
          },
          hint: {
            en: 'Vibrant single-origin clarity from high-altitude Minas',
            'pt-BR': 'Clareza vibrante de origem única das montanhas de Minas'
          }
        },
        {
          id: 'smooth-decaf',
          icon: 'moon',
          label: {
            en: 'Sweet Stone Fruit — Caffeine-Free',
            'pt-BR': 'Frutas Amarelas e Melado — Sem Cafeína'
          },
          hint: {
            en: 'Sugarcane natural decaf ideal for afternoons & evenings',
            'pt-BR': 'Descafeinado natural de cana-de-açúcar para qualquer horário'
          }
        },
        {
          id: 'curious-taster',
          icon: 'sparkles',
          label: {
            en: 'A Curated Trio to Taste Side by Side',
            'pt-BR': 'Um Trio Selecionado para Degustar Lado a Lado'
          },
          hint: {
            en: 'Compare three regional Brazilian harvests in one box',
            'pt-BR': 'Compare três safras regionais brasileiras em uma só caixa'
          }
        }
      ]
    },
    {
      id: 'morningCadence',
      question: {
        en: 'How much coffee does your home go through?',
        'pt-BR': 'Qual é o ritmo de consumo de café na sua casa?'
      },
      subtitle: {
        en: 'Subscriptions include 15% savings and free carbon-neutral shipping on every bag.',
        'pt-BR': 'Assinaturas garantem 15% de desconto e frete grátis carbono neutro sempre.'
      },
      options: [
        {
          id: 'daily-solo',
          icon: 'cup',
          label: {
            en: '1–2 Cups a Day (Monthly Ritual)',
            'pt-BR': '1 a 2 Xícaras por Dia (Ritual Mensal)'
          },
          hint: {
            en: '250g fresh bag delivered monthly with 15% off',
            'pt-BR': 'Pacote fresco de 250g todo mês com 15% OFF'
          }
        },
        {
          id: 'household',
          icon: 'users',
          label: {
            en: '3+ Cups Daily (Shared Household)',
            'pt-BR': '3+ Xícaras por Dia (Casa Movimentada)'
          },
          hint: {
            en: '500g bag every 2 weeks so mornings never run dry',
            'pt-BR': 'Pacote de 500g a cada 2 semanas para nunca faltar café'
          }
        },
        {
          id: 'heavy-brewer',
          icon: 'leaf',
          label: {
            en: 'Zero-Waste Bulk Pantry (1kg)',
            'pt-BR': 'Despensa Zero Desperdício (1kg)'
          },
          hint: {
            en: '1kg compostable pouch monthly — 15% size + 15% sub savings',
            'pt-BR': 'Pacote compostável de 1kg mensal — máxima economia e menos embalagens'
          }
        },
        {
          id: 'try-once',
          icon: 'bag',
          label: {
            en: 'Just Trying It Out First',
            'pt-BR': 'Quero Experimentar Primeiro'
          },
          hint: {
            en: 'One-time 250g bag with zero commitment',
            'pt-BR': 'Compra única de 250g sem compromisso de assinatura'
          }
        }
      ]
    }
  ];

  function resolveGrind(brewMethod) {
    if (brewMethod === 'espresso') {
      return 'espresso';
    }
    if (brewMethod === 'pour-over') {
      return 'pour-over';
    }
    if (brewMethod === 'french-press') {
      return 'french-press';
    }
    return 'whole-bean';
  }

  function resolveSizeAndCadence(morningCadence) {
    if (morningCadence === 'household') {
      return { size: '500g', cadence: 'biweekly' };
    }
    if (morningCadence === 'heavy-brewer') {
      return { size: '1kg', cadence: 'monthly' };
    }
    if (morningCadence === 'try-once') {
      return { size: '250g', cadence: 'one-time' };
    }
    return { size: '250g', cadence: 'monthly' };
  }

  function recommend(answers) {
    var safe = answers || {};
    var brew = safe.brewMethod || 'espresso';
    var flavor = safe.flavorProfile || 'chocolate-nutty';
    var rhythm = safe.morningCadence || 'daily-solo';

    var grind = resolveGrind(brew);
    var pacing = resolveSizeAndCadence(rhythm);
    var productId = 'starter-pack';
    var reason;

    if (flavor === 'smooth-decaf') {
      productId = 'chapada-decaf';
      reason = {
        en: 'Chapada Honey Decaf preserves sweet stone-fruit and molasses notes via natural sugarcane decaffeination—crafted for guilt-free cups at any hour.',
        'pt-BR': 'O Descafeinado Mel da Chapada preserva notas doces de frutas amarelas e melado com descafeinação natural de cana—perfeito para qualquer hora do dia ou da noite.'
      };
    } else if (flavor === 'curious-taster' || brew === 'multi-brew') {
      productId = 'discovery-flight';
      reason = {
        en: 'The Roaster’s Discovery Flight pairs three 150g regional Brazilian roasts side by side so you can explore Cerrado, Sul de Minas, and Bahia without guesswork.',
        'pt-BR': 'O Kit Degustação do Torrador reúne três pacotes de 150g de regiões brasileiras distintas para você comparar Cerrado, Sul de Minas e Bahia sem dúvida.'
      };
    } else if (flavor === 'bright-citrus') {
      productId = 'serra-verde';
      reason = {
        en: 'Serra Verde Single-Origin from 1,320m in Sul de Minas shines with clean tangerine zest and wildflower honey sweetness in your chosen brew method.',
        'pt-BR': 'O Serra Verde Origem Única, cultivado a 1.320m no Sul de Minas, entrega acidez cítrica limpa de tangerina e doçura de mel silvestre no seu método favorito.'
      };
    } else if (brew === 'espresso' && (rhythm === 'try-once' || rhythm === 'daily-solo')) {
      productId = 'starter-pack';
      reason = {
        en: 'Our flagship Eco-First Espresso Starter Pack delivers syrupy dark-chocolate crema and effortless dial-in for first-time specialty brewers.',
        'pt-BR': 'Nosso carro-chefe Kit Inicial Espresso Eco-First entrega crema densa de chocolate amargo e preparo descomplicado para quem busca café especial sem erro.'
      };
    } else {
      productId = 'cerrado-gold';
      reason = {
        en: 'Cerrado Gold Espresso brings Yellow Bourbon roasted-almond sweetness and velvety body that holds up cleanly across straight shots, milk, and immersion.',
        'pt-BR': 'O Espresso Ouro do Cerrado traz Bourbon Amarelo com doçura de amêndoas torradas e corpo licoroso que brilha puro, com leite ou por infusão.'
      };
    }

    return {
      productId: productId,
      grind: grind,
      size: productId === 'discovery-flight' ? '450g' : pacing.size,
      cadence: pacing.cadence,
      reason: reason
    };
  }

  var impactTracker = {
    'starter-pack': {
      productId: 'starter-pack',
      lotCode: 'LOT-MG-2606',
      region: {
        en: 'Cerrado Mineiro, MG — Brazil',
        'pt-BR': 'Cerrado Mineiro, MG — Brasil'
      },
      farm: 'Fazenda Boa Esperança',
      harvestDate: '2026-06',
      roastDate: '2026-11-20',
      farmerStory: {
        en: 'Led by the Ribeiro family across 42 hectares of solar-irrigated Cerrado plateaus, Fazenda Boa Esperança invests direct-trade premiums into drip-water conservation and youth agroecology workshops.',
        'pt-BR': 'Conduzida pela família Ribeiro em 42 hectares irrigados por energia solar no Cerrado, a Fazenda Boa Esperança reinveste o prêmio direto em gotejamento econômico e oficinas agroecológicas para jovens.'
      },
      priceBreakdown: {
        farmerPct: 48,
        roastingPackPct: 34,
        communityFundPct: 18
      },
      cleanWaterLitersPerBag: 120,
      schoolHoursPerBag: 1.5,
      extraFarmerUsdPerBag: 3.10,
      extraFarmerBrlPerBag: 15.40
    },
    'cerrado-gold': {
      productId: 'cerrado-gold',
      lotCode: 'LOT-PT-2607',
      region: {
        en: 'Patrocínio, MG — Brazil',
        'pt-BR': 'Patrocínio, MG — Brasil'
      },
      farm: 'Sítio Serra Negra',
      harvestDate: '2026-07',
      roastDate: '2026-11-21',
      farmerStory: {
        en: 'At Sítio Serra Negra (1,100m), Dona Helena and her team hand-select Yellow Bourbon cherries on volcanic slopes, funding community solar dryers and local rural school transport.',
        'pt-BR': 'No Sítio Serra Negra (1.100m), Dona Helena e sua equipe colhem grãos de Bourbon Amarelo seletivamente em encostas férteis, financiando terreiros solares comunitários e transporte escolar rural.'
      },
      priceBreakdown: {
        farmerPct: 46,
        roastingPackPct: 36,
        communityFundPct: 18
      },
      cleanWaterLitersPerBag: 110,
      schoolHoursPerBag: 1.4,
      extraFarmerUsdPerBag: 2.85,
      extraFarmerBrlPerBag: 14.15
    },
    'serra-verde': {
      productId: 'serra-verde',
      lotCode: 'LOT-SM-2608',
      region: {
        en: 'Carmo de Minas, Sul de Minas, MG — Brazil',
        'pt-BR': 'Carmo de Minas, Sul de Minas, MG — Brasil'
      },
      farm: 'Cooperativa Vale das Flores',
      harvestDate: '2026-08',
      roastDate: '2026-11-22',
      farmerStory: {
        en: 'Grown beneath Atlantic Forest canopy by 18 women producers in Carmo de Minas, this washed micro-lot carries a 42% wage premium and funds watershed restoration springs.',
        'pt-BR': 'Cultivado sob a Mata Atlântica por 18 produtoras de Carmo de Minas, este microlote lavado paga 42% acima do mercado e financia a recuperação de nascentes da bacia local.'
      },
      priceBreakdown: {
        farmerPct: 50,
        roastingPackPct: 32,
        communityFundPct: 18
      },
      cleanWaterLitersPerBag: 145,
      schoolHoursPerBag: 1.8,
      extraFarmerUsdPerBag: 3.60,
      extraFarmerBrlPerBag: 17.85
    },
    'chapada-decaf': {
      productId: 'chapada-decaf',
      lotCode: 'LOT-BA-2607',
      region: {
        en: 'Chapada Diamantina, BA — Brazil',
        'pt-BR': 'Chapada Diamantina, BA — Brasil'
      },
      farm: 'Fazenda Pedra Branca',
      harvestDate: '2026-07',
      roastDate: '2026-11-21',
      farmerStory: {
        en: 'Highland growers in Piatã partner with natural Brazilian sugarcane ethyl-acetate decaffeination, avoiding harsh solvents while financing ceramic water filters for 65 neighboring families.',
        'pt-BR': 'Produtores de altitude em Piatã unem o cultivo regenerativo à descafeinação natural com acetato de cana-de-açúcar brasileira, sem solventes químicos, financiando filtros de barro e cerâmica para 65 famílias.'
      },
      priceBreakdown: {
        farmerPct: 47,
        roastingPackPct: 35,
        communityFundPct: 18
      },
      cleanWaterLitersPerBag: 135,
      schoolHoursPerBag: 1.6,
      extraFarmerUsdPerBag: 3.20,
      extraFarmerBrlPerBag: 15.90
    },
    'discovery-flight': {
      productId: 'discovery-flight',
      lotCode: 'LOT-BR-2607',
      region: {
        en: 'Minas Gerais & Bahia — Brazil',
        'pt-BR': 'Minas Gerais e Bahia — Brasil'
      },
      farm: 'Olívia Partner Collectives (MG & BA)',
      harvestDate: '2026-07',
      roastDate: '2026-11-22',
      farmerStory: {
        en: 'Bringing together three partner farms across Cerrado, Sul de Minas, and Chapada Diamantina, every Discovery Flight spreads direct-trade impact across three rural communities at once.',
        'pt-BR': 'Reunindo três fazendas parceiras no Cerrado, Sul de Minas e Chapada Diamantina, cada Kit Degustação distribui impacto de comércio direto para três comunidades rurais simultaneamente.'
      },
      priceBreakdown: {
        farmerPct: 49,
        roastingPackPct: 31,
        communityFundPct: 20
      },
      cleanWaterLitersPerBag: 180,
      schoolHoursPerBag: 2.2,
      extraFarmerUsdPerBag: 4.50,
      extraFarmerBrlPerBag: 22.30
    }
  };

  var caseStudy = {
    meta: {
      role: {
        en: 'Product Designer & Front-End Engineer',
        'pt-BR': 'Product Designer & Engenheiro Front-End'
      },
      timeline: {
        en: '3 Iterative Releases (v0.1 -> v0.1.2)',
        'pt-BR': '3 Entregas Iterativas (v0.1 -> v0.1.2)'
      },
      deliverables: {
        en: [
          'Figma Design System',
          'Bilingual Storefront (EN/PT-BR)',
          '3-Step Coffee Quiz',
          'Lot Impact Tracker',
          'Interactive Case Study'
        ],
        'pt-BR': [
          'Design System no Figma',
          'Loja Bilíngue (EN/PT-BR)',
          'Quiz de Café em 3 Passos',
          'Rastreador de Impacto por Lote',
          'Estudo de Caso Interativo'
        ]
      },
      stack: [
        'Figma Tokens',
        'Semantic HTML5',
        'Responsive CSS3',
        'Vanilla JS Globals',
        'localStorage State'
      ],
      version: 'v0.1.2'
    },
    brief: {
      eyebrow: {
        en: 'DESIGN BRIEF & PRODUCT CONTEXT',
        'pt-BR': 'BRIEFING & CONTEXTO DO PRODUTO'
      },
      title: {
        en: 'Making Eco-First Specialty Coffee Effortless for Busy First-Time Buyers',
        'pt-BR': 'Tornando o Café Especial Eco-First Simples para Compradores Ocupados'
      },
      summary: {
        en: 'Olívia Coffee Beans started as a high-contrast Figma brand prototype focused on ethical Brazilian sourcing. Across three iterations, we evolved it into a full bilingual DTC storefront that removes decision fatigue, proves direct-trade impact per lot, and converts first-time specialty shoppers in seconds.',
        'pt-BR': 'A Olívia Coffee Beans começou como um protótipo de marca no Figma focado em origem ética brasileira. Em três iterações, evoluímos o conceito para uma loja DTC bilíngue completa que elimina a fadiga de escolha, comprova o impacto direto de cada lote e converte novos compradores em segundos.'
      },
      challenge: {
        en: 'Specialty coffee jargon (roast curves, grind microns, varietals) intimidates newcomers, while vague sustainability claims feel unverified.',
        'pt-BR': 'Jargões de café especial (curvas de torra, granulometria, varietais) intimidam iniciantes, enquanto promessas ambientais genéricas geram desconfiança.'
      },
      outcome: {
        en: 'A guided 3-step coffee quiz, transparent lot-level price breakdown, and tactile kraft storefront built with zero framework bloat.',
        'pt-BR': 'Um quiz guiado em 3 passos, transparência financeira por lote e uma loja tátil bilíngue construída sem dependências pesadas.'
      }
    },
    chloePersona: {
      name: 'Chloe',
      age: {
        en: 'Early 50s',
        'pt-BR': 'Início dos 50 anos'
      },
      location: {
        en: 'Brasília, DF — Brazil',
        'pt-BR': 'Brasília, DF — Brasil'
      },
      occupation: {
        en: 'Company Executive',
        'pt-BR': 'Executiva de Empresa'
      },
      household: {
        en: 'Married with children, hectic daily schedule',
        'pt-BR': 'Casada, com filhos e rotina diária agitada'
      },
      buyerStage: {
        en: 'First-time specialty coffee buyer',
        'pt-BR': 'Primeira vez comprando café especial'
      },
      quote: {
        en: '“I want better morning coffee that actually supports Brazilian farmers—just tell me which grind fits my machine and don’t make me read a textbook.”',
        'pt-BR': '“Quero um café melhor de manhã que realmente apoie produtores brasileiros—só me diga qual moagem serve na minha máquina sem complicação.”'
      },
      goals: {
        en: [
          'Pick the right roast & grind in under 60 seconds',
          'Verify that farmer premiums and eco claims are real',
          'Put morning coffee on reliable auto-delivery'
        ],
        'pt-BR': [
          'Escolher torra e moagem certas em menos de 60 segundos',
          'Comprovar que o prêmio ao produtor e o impacto eco são reais',
          'Automatizar a reposição mensal sem faltar café em casa'
        ]
      },
      frustrations: {
        en: [
          'Overwhelming tasting-note jargon with no brew guidance',
          'Unclear grind compatibility for home espresso vs. drip',
          'Hidden shipping fees revealed only at final checkout'
        ],
        'pt-BR': [
          'Excesso de termos técnicos sem guia prático de preparo',
          'Dúvida sobre qual moagem escolher para máquina ou coador',
          'Frete caro ou surpresas apenas na etapa final do pagamento'
        ]
      }
    },
    painSolutions: [
      {
        id: 'decision-fatigue',
        pain: {
          en: 'First-time buyers freeze when choosing roast profiles, grind sizes, and bag weights.',
          'pt-BR': 'Novos compradores travam ao escolher perfil de torra, moagem e peso do pacote.'
        },
        solution: {
          en: '3-Step Coffee Quiz translates brew method, flavor taste, and household pace into an instant pre-configured bag.',
          'pt-BR': 'Quiz de Café em 3 passos traduz método, paladar e ritmo da casa em uma recomendação pronta para o carrinho.'
        },
        kpi: {
          en: '3 clicks to personalized SKU',
          'pt-BR': '3 cliques até o café ideal'
        }
      },
      {
        id: 'trust-gap',
        pain: {
          en: '“Direct-trade” and “carbon-neutral” claims often feel abstract without farm-level numbers.',
          'pt-BR': 'Selos de “comércio direto” e “carbono neutro” parecem abstratos sem números por lote.'
        },
        solution: {
          en: 'Interactive Lot Impact Tracker exposes exact price split (46–50% farmer), clean water liters, and school hours funded per bag.',
          'pt-BR': 'Rastreador de Impacto por Lote mostra a divisão exata do valor (46–50% ao produtor), litros de água limpa e horas escolares.'
        },
        kpi: {
          en: '100% lot-level price transparency',
          'pt-BR': '100% de transparência por lote'
        }
      },
      {
        id: 'busy-checkout',
        pain: {
          en: 'Hectic executive schedules leave no patience for clunky carts or surprise shipping thresholds.',
          'pt-BR': 'Rotinas executivas corridas não toleram carrinhos confusos nem regras obscuras de frete.'
        },
        solution: {
          en: 'Slide-out Cart Drawer with live free-shipping progress bar, 15% subscription toggle, and bilingual EN/PT-BR + $/R$ parity.',
          'pt-BR': 'Gaveta de carrinho com barra de frete grátis em tempo real, assinatura 15% OFF e alternância instantânea EN/PT-BR + $/R$.'
        },
        kpi: {
          en: 'Instant EN/PT-BR & $/R$ switch',
          'pt-BR': 'Troca imediata EN/PT-BR e $/R$'
        }
      }
    ],
    evolution: [
      {
        id: 'v0.1',
        version: 'v0.1',
        title: {
          en: 'Figma Brand & Story Prototype',
          'pt-BR': 'Protótipo de Marca e História no Figma'
        },
        summary: {
          en: 'Established the high-contrast Deep Forest + Cerrado Gold palette, editorial story bands, and 1-SKU express checkout concept.',
          'pt-BR': 'Estabeleceu a paleta Verde Floresta + Ouro do Cerrado, faixas editoriais de história e o conceito de checkout expresso de 1 SKU.'
        },
        highlights: {
          en: ['Hero composition & glass artwork', '4 story commitment bands', 'Box-packing purchase animation'],
          'pt-BR': ['Composição do hero e arte principal', '4 faixas de compromissos eco', 'Animação de embalagem na compra']
        },
        jumpTarget: '#features',
        ctaLabel: {
          en: 'Visit Brand Story',
          'pt-BR': 'Ver Nossa História'
        }
      },
      {
        id: 'v0.1.1',
        version: 'v0.1.1',
        title: {
          en: 'Bilingual 5-SKU Storefront',
          'pt-BR': 'Loja Bilíngue com 5 Cafés'
        },
        summary: {
          en: 'Expanded into a complete multi-SKU catalog with live EN/PT-BR + USD/BRL currency switching, bag configurator modal, and persistent slide-out cart drawer.',
          'pt-BR': 'Expandiu para um catálogo completo de 5 cafés com troca ao vivo EN/PT-BR + USD/BRL, configurador de pacotes e gaveta de carrinho persistente.'
        },
        highlights: {
          en: ['5 Brazilian specialty SKUs + custom assets', 'Size, grind & 15% subscription configurator', 'Live shipping meter & promo codes'],
          'pt-BR': ['5 cafés especiais + fotos exclusivas', 'Configurador de peso, moagem e assinatura 15%', 'Barra de frete grátis e cupons']
        },
        jumpTarget: '#shop',
        ctaLabel: {
          en: 'Explore All 5 Roasts',
          'pt-BR': 'Explorar os 5 Cafés'
        }
      },
      {
        id: 'v0.1.2',
        version: 'v0.1.2',
        title: {
          en: 'Guided Discovery, Traceability & Case Study',
          'pt-BR': 'Quiz Guiado, Rastreabilidade e Estudo de Caso'
        },
        summary: {
          en: 'Added the 3-step Coffee Quiz tailored for first-time buyers like Chloe, lot-level social impact dossiers, and this interactive UX case study.',
          'pt-BR': 'Adicionou o Quiz de Café em 3 passos pensado para compradoras como Chloe, dossiês de impacto por lote e este estudo de caso interativo.'
        },
        highlights: {
          en: ['Deterministic 3-step quiz -> cart flow', 'Per-lot farmer split & water/school metrics', 'Design system tokens & persona showcase'],
          'pt-BR': ['Quiz determinístico de 3 passos -> carrinho', 'Divisão de valor e métricas de água/escola', 'Tokens do design system e persona']
        },
        jumpTarget: 'open-quiz',
        ctaLabel: {
          en: 'Launch Coffee Quiz',
          'pt-BR': 'Abrir Quiz do Café'
        }
      }
    ],
    designTokens: [
      {
        token: '--ocb-primary-1',
        hex: '#216756',
        name: {
          en: 'Emerald Primary',
          'pt-BR': 'Esmeralda Primário'
        },
        role: {
          en: 'Primary action buttons, badges, and interactive focus states',
          'pt-BR': 'Botões de ação principais, selos e estados interativos'
        }
      },
      {
        token: '--ocb-primary-2',
        hex: '#1E3526',
        name: {
          en: 'Deep Forest',
          'pt-BR': 'Floresta Profunda'
        },
        role: {
          en: 'Hero radial backdrop, story sections, and footer anchor',
          'pt-BR': 'Fundo radial do hero, faixas de história e rodapé'
        }
      },
      {
        token: '--ocb-primary-3',
        hex: '#4EEEA6',
        name: {
          en: 'Mint Spark',
          'pt-BR': 'Menta Vibrante'
        },
        role: {
          en: 'Carbon-neutral highlights, progress meter, and live confirmations',
          'pt-BR': 'Destaques carbono neutro, barra de progresso e confirmações'
        }
      },
      {
        token: '--ocb-secondary-1',
        hex: '#E7DBCF',
        name: {
          en: 'Warm Kraft Sand',
          'pt-BR': 'Areia Kraft'
        },
        role: {
          en: 'Editorial alternating bands and tactile packaging backdrop',
          'pt-BR': 'Faixas editoriais alternadas e fundo tátil de embalagem'
        }
      },
      {
        token: '--ocb-secondary-3',
        hex: '#FFF2E6',
        name: {
          en: 'Ivory Cream',
          'pt-BR': 'Creme Marfim'
        },
        role: {
          en: 'High-legibility light cards, configurator modal, and cart drawer',
          'pt-BR': 'Cards claros de alta legibilidade, modal e gaveta do carrinho'
        }
      },
      {
        token: '--ocb-accent-1',
        hex: '#FEC51B',
        name: {
          en: 'Cerrado Gold',
          'pt-BR': 'Ouro do Cerrado'
        },
        role: {
          en: 'Primary hero headline accent, Buy Now CTA, and mobile drawer',
          'pt-BR': 'Destaque do título no hero, CTA Comprar e menu mobile'
        }
      },
      {
        token: '--ocb-gray-1000',
        hex: '#323232',
        name: {
          en: 'Espresso Charcoal',
          'pt-BR': 'Carvão Espresso'
        },
        role: {
          en: 'Primary body ink for accessible contrast on cream and sand',
          'pt-BR': 'Texto principal com contraste acessível sobre creme e areia'
        }
      }
    ],
    typographySpecimens: [
      {
        family: 'Alfa Slab One',
        weightLabel: '400 Display',
        role: {
          en: 'Bold hero headlines & landmark display titles',
          'pt-BR': 'Títulos de impacto no hero e cabeçalhos principais'
        },
        sample: {
          en: 'ECO-FIRST ESPRESSO',
          'pt-BR': 'ESPRESSO ECO-FIRST'
        }
      },
      {
        family: 'Merriweather',
        weightLabel: '700 Serif',
        role: {
          en: 'Editorial story headings & coffee origin craft cues',
          'pt-BR': 'Subtítulos editoriais e destaque artesanal de origem'
        },
        sample: {
          en: 'From Brazilian Highlands to Your Morning Cup',
          'pt-BR': 'Das Montanhas do Brasil para a Sua Xícara'
        }
      },
      {
        family: 'Lato',
        weightLabel: '400 / 700 / 900 Sans',
        role: {
          en: 'Primary UI controls, navigation, cards, and body copy',
          'pt-BR': 'Navegação, botões de interface, cards e texto corrido'
        },
        sample: {
          en: 'Solar-roasted in small batches · 100% home-compostable kraft.',
          'pt-BR': 'Torra solar em pequenos lotes · Pacote kraft 100% compostável.'
        }
      },
      {
        family: 'Roboto',
        weightLabel: '400 / 500 Mono-Clean',
        role: {
          en: 'Checkout form inputs, lot metadata, and tabular pricing',
          'pt-BR': 'Campos de checkout, metadados de lote e valores numéricos'
        },
        sample: {
          en: 'LOT-MG-2606 · 1,150m · +38% Farmer Wage Premium',
          'pt-BR': 'LOT-MG-2606 · 1.150m · +38% Prêmio ao Produtor'
        }
      }
    ]
  };

  window.OCB_M2 = {
    quiz: {
      steps: quizSteps,
      recommend: recommend
    },
    impactTracker: impactTracker,
    caseStudy: caseStudy
  };
})();
