const TelegramBot = require('node-telegram-bot-api');
// Environment variabledan token olish
const BOT_TOKEN = '8167038447:AAE3EA27uIk-VjiOs8lWD_YwyDTQAUMSoYc';

// // Token tekshirish
// if (!BOT_TOKEN || BOT_TOKEN === '8167038447:AAE3EA27uIk-VjiOs8lWD_YwyDTQAUMSoYc') {
//   console.error('❌ BOT_TOKEN topilmadi! Iltimos, Render.com Environment Variables da BOT_TOKEN ni qo\'ying');
//   process.exit(1);
// }

// const bot = new TelegramBot(BOT_TOKEN, { polling: true });
try {
  const bot = new TelegramBot(BOT_TOKEN, {
    polling: {
      interval: 1000,
      timeout: 10,
      autoStart: true
    }
  });

  console.log('✅ Bot polling rejimida ishga tushdi...');

  // ... SIZNING KODLARINGIZ ...


  // Foydalanuvchi holatlari
  const userStates = new Map();
  const userCars = new Map();

  // Marka ro'yxati
  const brands = [
    ['Toyota', 'Hyundai'],
    ['Chevrolet', 'Ford'],
    ['BMW', 'Mercedes'],
    ['Kia', 'Nissan'],
    ['Honda', 'Daewoo'],
    ['⬅️ Ortga']
  ];

  // Modellar va ularning O'zbekistondagi o'rtacha yangi narxlari (so'mda)
  const models = {
    'Toyota': [
      { name: 'Camry', price: 420000000 },
      { name: 'Corolla', price: 320000000 },
      { name: 'RAV4', price: 480000000 },
      { name: 'Land Cruiser', price: 980000000 },
      { name: 'Prius', price: 380000000 },
      { name: 'Highlander', price: 520000000 },
      { name: '⬅️ Ortga', price: 0 }
    ],
    'Hyundai': [
      { name: 'Sonata', price: 360000000 },
      { name: 'Elantra', price: 280000000 },
      { name: 'Tucson', price: 420000000 },
      { name: 'Santa Fe', price: 520000000 },
      { name: 'Accent', price: 220000000 },
      { name: 'Creta', price: 380000000 },
      { name: '⬅️ Ortga', price: 0 }
    ],
    'Chevrolet': [
      { name: 'Malibu', price: 340000000 },
      { name: 'Cruze', price: 260000000 },
      { name: 'Equinox', price: 440000000 },
      { name: 'Tahoe', price: 680000000 },
      { name: 'Traverse', price: 520000000 },
      { name: 'Nexia', price: 140000000 },
      { name: 'Spark', price: 120000000 },
      { name: 'Cobalt', price: 160000000 },
      { name: 'Gentra', price: 180000000 },
      { name: 'Matiz', price: 90000000 },
      { name: '⬅️ Ortga', price: 0 }
    ],
    'Ford': [
      { name: 'Focus', price: 240000000 },
      { name: 'Mondeo', price: 380000000 },
      { name: 'Explorer', price: 580000000 },
      { name: 'Kuga', price: 420000000 },
      { name: 'Fiesta', price: 200000000 },
      { name: 'EcoSport', price: 320000000 },
      { name: '⬅️ Ortga', price: 0 }
    ],
    'BMW': [
      { name: 'X5', price: 880000000 },
      { name: 'X3', price: 680000000 },
      { name: 'X7', price: 1280000000 },
      { name: '5 Series', price: 720000000 },
      { name: '3 Series', price: 580000000 },
      { name: '7 Series', price: 980000000 },
      { name: '⬅️ Ortga', price: 0 }
    ],
    'Mercedes': [
      { name: 'E-Class', price: 780000000 },
      { name: 'C-Class', price: 620000000 },
      { name: 'S-Class', price: 1180000000 },
      { name: 'GLC', price: 720000000 },
      { name: 'GLE', price: 820000000 },
      { name: 'G-Class', price: 1580000000 },
      { name: '⬅️ Ortga', price: 0 }
    ],
    'Kia': [
      { name: 'Optima', price: 340000000 },
      { name: 'Rio', price: 200000000 },
      { name: 'Sportage', price: 420000000 },
      { name: 'Sorento', price: 480000000 },
      { name: 'Cerato', price: 280000000 },
      { name: 'K5', price: 380000000 },
      { name: '⬅️ Ortga', price: 0 }
    ],
    'Nissan': [
      { name: 'Altima', price: 320000000 },
      { name: 'Sentra', price: 260000000 },
      { name: 'X-Trail', price: 440000000 },
      { name: 'Qashqai', price: 360000000 },
      { name: 'Patrol', price: 920000000 },
      { name: 'Sunny', price: 180000000 },
      { name: '⬅️ Ortga', price: 0 }
    ],
    'Honda': [
      { name: 'Accord', price: 380000000 },
      { name: 'Civic', price: 300000000 },
      { name: 'CR-V', price: 460000000 },
      { name: 'Pilot', price: 520000000 },
      { name: 'HR-V', price: 340000000 },
      { name: '⬅️ Ortga', price: 0 }
    ],
    'Daewoo': [
      { name: 'Nexia', price: 140000000 },
      { name: 'Matiz', price: 80000000 },
      { name: 'Gentra', price: 160000000 },
      { name: 'Damas', price: 70000000 },
      { name: 'Lacetti', price: 150000000 },
      { name: 'Tico', price: 50000000 },
      { name: '⬅️ Ortga', price: 0 }
    ]
  };

  // Ranglar
  const colors = [
    ['Oq', 'Qora', 'Kumush'],
    ['Kulrang', 'Qizil', 'Ko\'k'],
    ['Yashil', 'Jigarrang', 'Oltin'],
    ['⬅️ Ortga']
  ];

  // Texnik holat
  const conditions = [
    ['⭐️⭐️⭐️⭐️⭐️ A\'lo (90-100%)'],
    ['⭐️⭐️⭐️⭐️ Yaxshi (75-89%)'],
    ['⭐️⭐️⭐️ O\'rtacha (60-74%)'],
    ['⭐️⭐️ Qoniqarli (40-59%)'],
    ['⭐️ Yomon (0-39%)'],
    ['⬅️ Ortga']
  ];

  // Ta'mirlash tarixi
  const repairHistory = [
    ['✅ Katta ta\'mirlash o\'tkazilgan'],
    ['✅ Dvigatel ta\'mirlangan'],
    ['✅ Transmissiya almashtirilgan'],
    ['✅ Yoqilg\'i tizimi ta\'mirlangan'],
    ['❌ Hech qanday katta ta\'mirlash yo\'q'],
    ['⬅️ Ortga']
  ];

  // Garantiya
  const warrantyOptions = [
    ['✅ Garantiya mavjud'],
    ['⚠️ Garantiya tugagan'],
    ['❌ Garantiya yo\'q'],
    ['⬅️ Ortga']
  ];

  // Tashqi ko'rinish
  const exteriorCondition = [
    ['⭐️⭐️⭐️⭐️⭐️ A\'lo - chiziq, dog\' yo\'q'],
    ['⭐️⭐️⭐️⭐️ Yaxshi - mayda chiziqlar'],
    ['⭐️⭐️⭐️ O\'rtacha - bir necha chiziq'],
    ['⭐️⭐️ Qoniqarli - ko\'p mayda shikastlar'],
    ['⭐️ Yomon - katta shikastlar'],
    ['⬅️ Ortga']
  ];

  // Ichki makon holati
  const interiorCondition = [
    ['⭐️⭐️⭐️⭐️⭐️ A\'lo - yangidek'],
    ['⭐️⭐️⭐️⭐️ Yaxshi - oz miqdorda ishlatilgan'],
    ['⭐️⭐️⭐️ O\'rtacha - normal ishlatilgan'],
    ['⭐️⭐️ Qoniqarli - eskirgan'],
    ['⭐️ Yomon - kuchsiz holat'],
    ['⬅️ Ortga']
  ];

  // O'zbekiston hududlari
  const regions = [
    ['Toshkent sh.', 'Toshkent vil.'],
    ['Samarqand', 'Buxoro'],
    ['Andijon', 'Farg\'ona'],
    ['Namangan', 'Qashqadaryo'],
    ['Surxandaryo', 'Jizzax'],
    ['Sirdaryo', 'Navoiy'],
    ['Xorazm', 'Qoraqalpog\'iston'],
    ['⬅️ Ortga']
  ];

  // Asosiy menyu
  const mainMenu = {
    reply_markup: {
      keyboard: [
        ['🚗 Yangi avtomobil qo\'shish'],
        ['💰 Avtomobilni baholash'],
        ['📊 Mening avtomobillarim'],
        ['ℹ️ Yordam']
      ],
      resize_keyboard: true
    }
  };

  // Keyboard yasash funksiyasi
  function createKeyboard(options) {
    return {
      reply_markup: {
        keyboard: options,
        resize_keyboard: true
      }
    };
  }

  // Model keyboard yasash
  function createModelKeyboard(brand) {
    const modelButtons = models[brand].map(model =>
      [`${model.name} - ${model.price ? (model.price / 1000000) + ' mln' : '⬅️ Ortga'}`]
    );
    return createKeyboard(modelButtons);
  }

  // Ortga qaytish funksiyasi
  function goBack(chatId, currentState) {
    const state = userStates.get(chatId);
    if (!state) return null;

    switch (currentState) {
      case 'brand_selection':
        userStates.delete(chatId);
        bot.sendMessage(chatId, 'Asosiy menyu:', mainMenu);
        break;

      case 'model_selection':
        state.step = 'brand_selection';
        bot.sendMessage(chatId, '🏷️ Avtomobil markasini tanlang:', createKeyboard(brands));
        break;

      case 'year_selection':
        state.step = 'model_selection';
        bot.sendMessage(chatId, `🚙 ${state.data.brand} modelini tanlang:`, createModelKeyboard(state.data.brand));
        break;

      case 'color_selection':
        state.step = 'year_selection';
        bot.sendMessage(chatId, '📅 Ishlab chiqarilgan yilini kiriting (masalan: 2020):', createKeyboard([['⬅️ Ortga']]));
        break;

      case 'initial_mileage':
        state.step = 'color_selection';
        bot.sendMessage(chatId, '🎨 Rangni tanlang:', createKeyboard(colors));
        break;

      case 'initial_condition':
        state.step = 'initial_mileage';
        bot.sendMessage(chatId, '🛣️ Boshlang\'ich probegni kiriting (km):\nMasalan: 0', createKeyboard([['⬅️ Ortga']]));
        break;

      // Baholash uchun ortga qaytish
      case 'car_selection_valuation':
        userStates.delete(chatId);
        bot.sendMessage(chatId, 'Asosiy menyu:', mainMenu);
        break;

      case 'current_mileage':
        state.step = 'car_selection_valuation';
        const cars = userCars.get(chatId) || [];
        const carButtons = cars.map(car => [`${car.brand} ${car.model} (${car.year})`]);
        carButtons.push(['⬅️ Ortga']);
        bot.sendMessage(chatId, '🚗 Baholash uchun avtomobilni tanlang:', createKeyboard(carButtons));
        break;

      case 'technical_condition':
        state.step = 'current_mileage';
        bot.sendMessage(chatId, `🛣️ Joriy probegni kiriting (km):\nOldingi: ${state.selectedCar.initialMileage} km`, createKeyboard([['⬅️ Ortga']]));
        break;

      case 'repair_history':
        state.step = 'technical_condition';
        bot.sendMessage(chatId, '🔧 Joriy texnik holatini tanlang:', createKeyboard(conditions));
        break;

      case 'warranty':
        state.step = 'repair_history';
        bot.sendMessage(chatId, '🛠️ Ta\'mirlash tarixi:', createKeyboard(repairHistory));
        break;

      case 'exterior_condition':
        state.step = 'warranty';
        bot.sendMessage(chatId, '📅 Garantiya holati:', createKeyboard(warrantyOptions));
        break;

      case 'interior_condition':
        state.step = 'exterior_condition';
        bot.sendMessage(chatId, '🎨 Tashqi ko\'rinish holati:', createKeyboard(exteriorCondition));
        break;

      case 'region_selection':
        state.step = 'interior_condition';
        bot.sendMessage(chatId, '🛋️ Ichki makon holati:', createKeyboard(interiorCondition));
        break;

      default:
        userStates.delete(chatId);
        bot.sendMessage(chatId, 'Asosiy menyu:', mainMenu);
    }
  }

  // Bot ishga tushganda
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    userStates.delete(chatId);

    bot.sendMessage(chatId,
      `🤖 Avtomobil Baholash Botiga xush kelibsiz!\n\n` +
      `Avtomobilingizning haqiqiy bozor bahosini hisoblab beramiz.\n` +
      `📊 Barcha narxlar O'zbekiston bozoridagi statistika asosida!`,
      mainMenu
    );
  });

  // Asosiy menyu komandalari
  bot.onText(/🚗 Yangi avtomobil qo\'shish/, (msg) => {
    const chatId = msg.chat.id;
    userStates.set(chatId, { step: 'brand_selection', data: {} });

    bot.sendMessage(chatId, '🏷️ Avtomobil markasini tanlang:', createKeyboard(brands));
  });

  bot.onText(/💰 Avtomobilni baholash/, async (msg) => {
    const chatId = msg.chat.id;
    const cars = userCars.get(chatId) || [];

    if (cars.length === 0) {
      bot.sendMessage(chatId,
        'ℹ️ Avval avtomobil qo\'shishingiz kerak.',
        mainMenu
      );
      return;
    }

    const carButtons = cars.map((car, index) =>
      [`${car.brand} ${car.model} (${car.year})`]
    );
    carButtons.push(['⬅️ Ortga']);

    userStates.set(chatId, { step: 'car_selection_valuation', data: {} });
    bot.sendMessage(chatId, '🚗 Baholash uchun avtomobilni tanlang:', createKeyboard(carButtons));
  });

  bot.onText(/📊 Mening avtomobillarim/, (msg) => {
    const chatId = msg.chat.id;
    const cars = userCars.get(chatId) || [];

    if (cars.length === 0) {
      bot.sendMessage(chatId, 'ℹ️ Hozircha avtomobillar ro\'yxati bo\'sh.', mainMenu);
      return;
    }

    let carList = '🚗 Mening avtomobillarim:\n\n';
    cars.forEach((car, index) => {
      carList += `${index + 1}. ${car.brand} ${car.model} (${car.year})\n`;
      carList += `   💰 Yangi narx: ${(car.originalPrice / 1000000).toFixed(1)} mln so'm\n`;
      carList += `   🛣️ Boshlang'ich probeg: ${car.initialMileage} km\n\n`;
    });

    bot.sendMessage(chatId, carList, mainMenu);
  });

  bot.onText(/ℹ️ Yordam/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId,
      `🤖 Avtomobil Baholash Boti\n\n` +
      `📊 Barcha narxlar O'zbekiston bozoridagi statistika asosida!\n\n` +
      `Hisoblash omillari:\n` +
      `• 📅 Yoshi va amortizatsiya\n` +
      `• 🛣️ Probeg\n` +
      `• 🔧 Texnik holati\n` +
      `• 🛠️ Ta'mirlash tarixi\n` +
      `• 🎨 Tashqi va ichki holat\n` +
      `• 📍 Hudud\n\n` +
      `Botdan foydalanish:\n` +
      `1. "🚗 Yangi avtomobil qo'shish" - avtomobil ma'lumotlarini kiritish\n` +
      `2. "💰 Avtomobilni baholash" - joriy bahoni hisoblash\n` +
      `3. "📊 Mening avtomobillarim" - ro'yxatni ko'rish`,
      mainMenu
    );
  });

  // Ortga qaytish
  bot.onText(/⬅️ Ortga/, (msg) => {
    const chatId = msg.chat.id;
    const state = userStates.get(chatId);

    if (state) {
      goBack(chatId, state.step);
    } else {
      bot.sendMessage(chatId, 'Asosiy menyu:', mainMenu);
    }
  });

  // Marka tanlash
  bot.onText(/^(Toyota|Hyundai|Chevrolet|Ford|BMW|Mercedes|Kia|Nissan|Honda|Daewoo)$/, (msg, match) => {
    const chatId = msg.chat.id;
    const state = userStates.get(chatId);

    if (state && state.step === 'brand_selection') {
      state.data.brand = match[0];
      state.step = 'model_selection';

      bot.sendMessage(chatId, `🚙 ${match[0]} modelini tanlang:\n( Narxlar O'zbekiston bozori uchun )`, createModelKeyboard(match[0]));
    }
  });

  // Model tanlash - yangi format
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const state = userStates.get(chatId);

    if (!state || state.step !== 'model_selection') return;

    // Model tanlash
    const brandModels = models[state.data.brand];
    const selectedModel = brandModels.find(model =>
      text.startsWith(model.name)
    );

    if (selectedModel && selectedModel.name !== '⬅️ Ortga') {
      state.data.model = selectedModel.name;
      state.data.originalPrice = selectedModel.price;
      state.step = 'year_selection';

      bot.sendMessage(chatId,
        `✅ ${selectedModel.name} tanlandi\n` +
        `💰 Yangi narxi: ${(selectedModel.price / 1000000).toFixed(1)} mln so'm\n\n` +
        `📅 Ishlab chiqarilgan yilini kiriting (masalan: 2020):`,
        createKeyboard([['⬅️ Ortga']])
      );
    }
  });

  // Yil kiritish
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const state = userStates.get(chatId);

    if (!state) return;

    // Yil kiritish
    if (state.step === 'year_selection' && /^\d{4}$/.test(text)) {
      const year = parseInt(text);
      if (year >= 1990 && year <= 2024) {
        state.data.year = year;
        state.step = 'color_selection';
        bot.sendMessage(chatId, '🎨 Rangni tanlang:', createKeyboard(colors));
      } else {
        bot.sendMessage(chatId, '❌ Iltimos, 1990-2024 oralig\'ida yil kiriting:');
      }
    }

    // Rang tanlash
    else if (state.step === 'color_selection' && ['Oq', 'Qora', 'Kumush', 'Kulrang', 'Qizil', 'Ko\'k', 'Yashil', 'Jigarrang', 'Oltin'].includes(text)) {
      state.data.color = text;
      state.step = 'initial_mileage';
      bot.sendMessage(chatId,
        '🛣️ Boshlang\'ich probegni kiriting (km):\nMasalan: 0',
        createKeyboard([['⬅️ Ortga']])
      );
    }

    // Probeg kiritish
    else if (state.step === 'initial_mileage' && /^\d+$/.test(text)) {
      state.data.initialMileage = parseInt(text);
      state.step = 'initial_condition';
      bot.sendMessage(chatId,
        '🔧 Dastlabki texnik holatini tanlang:',
        createKeyboard(conditions)
      );
    }

    // Texnik holat tanlash
    else if (state.step === 'initial_condition' && text.includes('⭐️')) {
      state.data.initialCondition = text;

      // Saqlash
      if (!userCars.has(chatId)) {
        userCars.set(chatId, []);
      }
      userCars.get(chatId).push(state.data);

      bot.sendMessage(chatId,
        `✅ Avtomobil muvaffaqiyatli qo'shildi!\n\n` +
        `🏷️ ${state.data.brand} ${state.data.model}\n` +
        `📅 ${state.data.year} yil\n` +
        `🎨 ${state.data.color}\n` +
        `💰 Yangi narx: ${(state.data.originalPrice / 1000000).toFixed(1)} mln so'm\n` +
        `🛣️ Boshlang'ich probeg: ${state.data.initialMileage} km`,
        mainMenu
      );

      userStates.delete(chatId);
    }
  });

  // Baholash jarayoni - avtomobil tanlash
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const state = userStates.get(chatId);
    const cars = userCars.get(chatId) || [];

    if (!state || state.step !== 'car_selection_valuation') return;

    // Avtomobil tanlash
    const selectedCar = cars.find(car =>
      `${car.brand} ${car.model} (${car.year})` === text
    );

    if (selectedCar) {
      state.selectedCar = selectedCar;
      state.step = 'current_mileage';

      bot.sendMessage(chatId,
        `🚗 ${selectedCar.brand} ${selectedCar.model} tanlandi\n\n` +
        `🛣️ Joriy probegni kiriting (km):\nOldingi: ${selectedCar.initialMileage} km`,
        createKeyboard([['⬅️ Ortga']])
      );
    }
  });

  // Joriy probeg kiritish
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const state = userStates.get(chatId);

    if (state && state.step === 'current_mileage' && /^\d+$/.test(text)) {
      state.currentMileage = parseInt(text);
      state.step = 'technical_condition';

      bot.sendMessage(chatId,
        '🔧 Texnik holatini tanlang:',
        createKeyboard(conditions)
      );
    }
  });

  // Texnik holat tanlash
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const state = userStates.get(chatId);

    if (state && state.step === 'technical_condition' && text.includes('⭐️')) {
      state.technicalCondition = text;
      state.step = 'repair_history';

      bot.sendMessage(chatId,
        '🛠️ Ta\'mirlash tarixi:',
        createKeyboard(repairHistory)
      );
    }
  });

  // Ta'mirlash tarixi tanlash
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const state = userStates.get(chatId);

    if (state && state.step === 'repair_history') {
      if (!state.repairHistory) state.repairHistory = [];

      if (text === '❌ Hech qanday katta ta\'mirlash yo\'q') {
        state.repairHistory = [text];
        state.step = 'warranty';
        bot.sendMessage(chatId, '📅 Garantiya holati:', createKeyboard(warrantyOptions));
      } else if (text !== '⬅️ Ortga' && (text.includes('✅') || text.includes('❌'))) {
        if (!state.repairHistory.includes(text)) {
          state.repairHistory.push(text);
        }
        // Bir nechta tanlash uchun shu yerda qoladi
        bot.sendMessage(chatId,
          `✅ Tanlanganlar: ${state.repairHistory.join(', ')}\n\n` +
          `Yana ta\'mirlash qo\'shasizmi yoki "⬅️ Ortga" ni bosing?`,
          createKeyboard([...repairHistory])
        );
      } else if (text === '⬅️ Ortga') {
        goBack(chatId, 'repair_history');
      }
    }
  });

  // Garantiya tanlash
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const state = userStates.get(chatId);

    if (state && state.step === 'warranty' && (text.includes('✅') || text.includes('⚠️') || text.includes('❌'))) {
      state.warranty = text;
      state.step = 'exterior_condition';

      bot.sendMessage(chatId,
        '🎨 Tashqi ko\'rinish holati:',
        createKeyboard(exteriorCondition)
      );
    }
  });

  // Tashqi ko'rinish tanlash
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const state = userStates.get(chatId);

    if (state && state.step === 'exterior_condition' && text.includes('⭐️')) {
      state.exteriorCondition = text;
      state.step = 'interior_condition';

      bot.sendMessage(chatId,
        '🛋️ Ichki makon holati:',
        createKeyboard(interiorCondition)
      );
    }
  });

  // Ichki makon tanlash
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const state = userStates.get(chatId);

    if (state && state.step === 'interior_condition' && text.includes('⭐️')) {
      state.interiorCondition = text;
      state.step = 'region_selection';

      bot.sendMessage(chatId,
        '📍 Hududni tanlang:',
        createKeyboard(regions)
      );
    }
  });

  // Hudud tanlash
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const state = userStates.get(chatId);

    if (state && state.step === 'region_selection' && [
      'Toshkent sh.', 'Toshkent vil.', 'Samarqand', 'Buxoro', 'Andijon', 'Farg\'ona',
      'Namangan', 'Qashqadaryo', 'Surxandaryo', 'Jizzax', 'Sirdaryo', 'Navoiy',
      'Xorazm', 'Qoraqalpog\'iston'
    ].includes(text)) {
      state.region = text;

      // Baholashni hisoblash
      const result = calculateValuation(state.selectedCar, state);

      // Natijani chiqarish
      bot.sendMessage(chatId, result, mainMenu);
      userStates.delete(chatId);
    }
  });

  // Baholash hisoblash funksiyasi
  function calculateValuation(car, condition) {
    let price = car.originalPrice;

    // Yil amortizatsiyasi
    const currentYear = new Date().getFullYear();
    const carAge = currentYear - car.year;
    const yearDepreciation = price * (carAge * 0.12); // Har yil 12%

    // Probeg amortizatsiyasi
    const mileageDiff = condition.currentMileage - car.initialMileage;
    const mileageDepreciation = price * (mileageDiff / 300000) * 0.5;

    // Texnik holat korreksiyasi
    let conditionMultiplier = 1;
    if (condition.technicalCondition.includes('⭐️⭐️⭐️⭐️⭐️')) conditionMultiplier = 0.95;
    else if (condition.technicalCondition.includes('⭐️⭐️⭐️⭐️')) conditionMultiplier = 0.82;
    else if (condition.technicalCondition.includes('⭐️⭐️⭐️')) conditionMultiplier = 0.65;
    else if (condition.technicalCondition.includes('⭐️⭐️')) conditionMultiplier = 0.45;
    else conditionMultiplier = 0.25;

    // Ta'mirlash tarixi korreksiyasi
    let repairMultiplier = 1;
    if (condition.repairHistory && condition.repairHistory.includes('❌ Hech qanday katta ta\'mirlash yo\'q')) {
      repairMultiplier = 1.05;
    } else if (condition.repairHistory && condition.repairHistory.some(r => r.includes('✅'))) {
      repairMultiplier = 0.95;
    }

    // Garantiya korreksiyasi
    let warrantyMultiplier = 1;
    if (condition.warranty && condition.warranty.includes('✅ Garantiya mavjud')) {
      warrantyMultiplier = 1.08;
    } else if (condition.warranty && condition.warranty.includes('⚠️ Garantiya tugagan')) {
      warrantyMultiplier = 1.0;
    } else {
      warrantyMultiplier = 0.95;
    }

    // Tashqi ko'rinish korreksiyasi
    let exteriorMultiplier = 1;
    if (condition.exteriorCondition.includes('⭐️⭐️⭐️⭐️⭐️')) exteriorMultiplier = 1.05;
    else if (condition.exteriorCondition.includes('⭐️⭐️⭐️⭐️')) exteriorMultiplier = 1.0;
    else if (condition.exteriorCondition.includes('⭐️⭐️⭐️')) exteriorMultiplier = 0.9;
    else if (condition.exteriorCondition.includes('⭐️⭐️')) exteriorMultiplier = 0.8;
    else exteriorMultiplier = 0.7;

    // Ichki makon korreksiyasi
    let interiorMultiplier = 1;
    if (condition.interiorCondition.includes('⭐️⭐️⭐️⭐️⭐️')) interiorMultiplier = 1.03;
    else if (condition.interiorCondition.includes('⭐️⭐️⭐️⭐️')) interiorMultiplier = 1.0;
    else if (condition.interiorCondition.includes('⭐️⭐️⭐️')) interiorMultiplier = 0.9;
    else if (condition.interiorCondition.includes('⭐️⭐️')) interiorMultiplier = 0.8;
    else interiorMultiplier = 0.7;

    // Hudud korreksiyasi
    let regionMultiplier = 1;
    if (condition.region === 'Toshkent sh.') regionMultiplier = 1.08;
    else if (condition.region === 'Toshkent vil.') regionMultiplier = 1.03;
    else if (['Samarqand', 'Buxoro', 'Andijon', 'Farg\'ona'].includes(condition.region)) regionMultiplier = 1.0;
    else regionMultiplier = 0.95;

    // Yakuniy narx
    price = price - yearDepreciation - mileageDepreciation;
    price = price * conditionMultiplier * repairMultiplier * warrantyMultiplier * exteriorMultiplier * interiorMultiplier * regionMultiplier;

    // Minimal narx
    price = Math.max(price, car.originalPrice * 0.1); // Kamida 10% qolsin

    const depreciationAmount = car.originalPrice - price;
    const depreciationPercent = ((depreciationAmount / car.originalPrice) * 100).toFixed(1);
    const annualDepreciation = carAge > 0 ? (depreciationPercent / carAge).toFixed(1) : '0';

    return `📊 BAHOLASH NATIJASI\n\n` +
      `🚗 ${car.brand} ${car.model} (${car.year})\n` +
      `💰 Yangi narx: ${(car.originalPrice / 1000000).toFixed(1)} mln so'm\n` +
      `💵 Joriy baho: ${(Math.round(price) / 1000000).toFixed(1)} mln so'm\n` +
      `📉 Pasayish: ${(Math.round(depreciationAmount) / 1000000).toFixed(1)} mln so'm (${depreciationPercent}%)\n` +
      `🗓️ Yillik amortizatsiya: ${annualDepreciation}%\n\n` +
      `📈 TAHLILLAR:\n` +
      `• 📅 Yoshi: ${carAge} yil\n` +
      `• 🛣️ Probeg: ${condition.currentMileage.toLocaleString()} km\n` +
      `• 🔧 Texnik holat: ${condition.technicalCondition.split(' ')[0]}\n` +
      `• 🛠️ Ta'mirlash: ${condition.repairHistory ? condition.repairHistory.join(', ') : 'Yo\'q'}\n` +
      `• 📍 Hudud: ${condition.region}\n\n` +
      `💡 TAKLIF:\n` +
      `Sotish narxi: ${(Math.round(price * 0.95) / 1000000).toFixed(1)} - ${(Math.round(price * 1.05) / 1000000).toFixed(1)} mln so'm`;
  }

  console.log('✅ Bot token muvaffaqiyatli yuklandi');
  console.log('🤖 Bot ishga tushdi...');
} catch (error) {
  console.error('❌ Bot ishga tushmadi:', error.message);

  // 5 soniyadan keyin qayta urinish
  setTimeout(() => {
    console.log('🔄 Qayta urinilmoqda...');
    process.exit(1);
  }, 5000);
}