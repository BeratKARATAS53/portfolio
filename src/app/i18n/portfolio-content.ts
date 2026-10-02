export type Lang = 'tr' | 'en';

export interface Education {
	school: string;
	location: string;
	period: string;
	degree?: string;
	gpa: string;
}

export interface WorkExperience {
	company: string;
	location: string;
	period: string;
	role: string;
	description: string;
	descriptionLink?: string;
	descriptionAfter?: string;
}

export interface Project {
	title: string;
	period: string;
	stack: string;
	description: string;
	thumb?: string;
	alt?: string;
}

export interface Internship {
	company: string;
	location: string;
	period: string;
	role: string;
	description: string;
}

export interface Drawing {
	src: string;
	alt: string;
	className: string;
}

export interface PortfolioContent {
	labels: {
		role: string;
		contact: string;
		location: string;
		nav: {
			home: string;
			homeShort: string;
			projects: string;
			internships: string;
			internshipsShort: string;
			hobbies: string;
		};
		theme: {
			light: string;
			dark: string;
		};
		sections: {
			education: string;
			work: string;
			projects: string;
			internships: string;
			hobbies: string;
			technologies: string;
		};
		gpa: string;
		logoTitle: string;
		sendEmail: string;
	};
	summary: string;
	education: Education[];
	work: WorkExperience[];
	projects: Project[];
	internships: Internship[];
	drawings: Drawing[];
}

const drawings: Drawing[] = [
	{ src: 'assets/drawings/Naruto.jpg', alt: 'Naruto', className: 'naruto' },
	{ src: 'assets/drawings/Edward Elric.jpg', alt: 'Edward Elric', className: 'edward-elric' },
	{ src: 'assets/drawings/Manga 1.jpg', alt: 'Manga 1', className: 'manga-1' },
	{ src: 'assets/drawings/Manga 2.jpg', alt: 'Manga 2', className: 'manga-2' },
	{ src: 'assets/drawings/Manga 3.jpg', alt: 'Manga 3', className: 'manga-3' },
	{ src: 'assets/drawings/Horse.jpg', alt: 'Horse', className: 'horse' },
	{ src: 'assets/drawings/Ice Age.jpg', alt: 'Ice Age', className: 'ice-age' },
	{ src: 'assets/drawings/Pontiac GTC.jpg', alt: 'Pontiac GTC', className: 'pontiac-gtc' },
	{ src: 'assets/drawings/Rose.jpg', alt: 'Rose', className: 'rose' },
	{ src: 'assets/drawings/Sasuke.jpg', alt: 'Sasuke', className: 'sasuke' },
	{ src: 'assets/drawings/Wolf.jpg', alt: 'Wolf', className: 'wolf' },
	{ src: 'assets/drawings/Mazda Rx-8.jpg', alt: 'Mazda Rx-8', className: 'mazda-rx-8' },
];

export const portfolioContent: Record<Lang, PortfolioContent> = {
	tr: {
		labels: {
			role: 'Yazılım Mühendisi',
			contact: 'İletişim',
			location: 'Ankara',
			nav: {
				home: 'Hakkımda',
				homeShort: 'Hakkımda',
				projects: 'Projelerim',
				internships: 'Staj Deneyimlerim',
				internshipsShort: 'Stajlar',
				hobbies: 'Hobilerim',
			},
			theme: {
				light: 'Açık Tema',
				dark: 'Koyu Tema',
			},
			sections: {
				education: 'Eğitimim',
				work: 'İş Deneyimlerim',
				projects: 'Projelerim',
				internships: 'Staj Deneyimlerim',
				hobbies: 'Hobilerim',
				technologies: 'Kullandığım Teknolojiler',
			},
			gpa: 'GPA:',
			logoTitle: 'Doğukan Berat Karataş\'ın Kısaltması',
			sendEmail: 'E-posta Gönder',
		},
		summary: 'Angular, NestJS ve Laravel ile uçtan uca web uygulamaları geliştiriyorum. Arayüz tasarımından API geliştirmeye, veritabanı yönetiminden sunucu kurulumu ve yayınlamaya kadar tüm süreçlerde aktif rol alıyorum. 2020\'den beri Z Yazılım\'da Cubicl ve Monkedo gibi gerçek kullanıcı tabanına sahip ürünlerde çalışıyorum. Boş zamanlarımda ise Oto-vs, Pazaryeribul ve Kolay Pazar gibi kendi fikirlerimi hayata geçiriyorum.',
		education: [
			{
				school: 'Hacettepe Üniversitesi',
				location: 'Ankara, Türkiye',
				period: '2015 - 2020',
				degree: 'Bilgisayar Mühendisliği (%100 İngilizce)',
				gpa: '3.00',
			},
			{
				school: 'Çağrıbey Anadolu Lisesi',
				location: 'Ankara, Türkiye',
				period: '2011 - 2015',
				gpa: '88,54',
			},
		],
		work: [
			{
				company: 'Z Yazılım LTD. ŞTİ.',
				location: 'ODTÜ Teknokent, Ankara, Türkiye',
				period: '2020 - Günümüz',
				role: 'Yazılım Mühendisi',
				description: 'Cubicl ve Monkedo gibi aktif kullanıcı kitlesine sahip ürünlerde uçtan uca (full-stack) geliştirici olarak görev alıyorum. Web uygulamalarının arayüz (frontend) ve sunucu (backend) geliştirmelerinden veri tabanı mimarisine, on-premise kurulumlardan sunucu bakım ve dağıtım süreçlerine kadar tüm geliştirme yaşam döngüsünü aktif olarak yönetiyorum. Görev aldığım önemli projelerin detaylarına',
				descriptionLink: 'projelerim',
				descriptionAfter: ' sekmesinden ulaşabilirsiniz.',
			},
		],
		projects: [
			{
				title: 'Cubicl İş Takip Programı',
				period: 'Ağustos 2020 - Günümüz',
				stack: 'Angular 17 - Laravel 9 - MongoDB (mongoose)',
				description: 'Kullanıcıların proje ve görev yönetimini kolaylaştıran Cubicl platformunda geliştirici olarak rol alıyorum; <a href="https://cubicl.io" target="_blank" class="text-primary">cubicl.io</a>. Kullanıcı geri bildirimlerine dayalı yeni özellikler geliştirmenin yanı sıra, on-premise ortamında hizmet alan müşterilerimizin sunucu güncellemelerini ve bakımlarını yürütüyorum.',
				thumb: 'assets/projects/cubicl.png',
				alt: 'Cubicl | İş Takip Programı',
			},
			{
				title: 'Monkedo Kodsuz Otomasyon Programı',
				period: 'Şubat 2023 - Günümüz',
				stack: 'Angular 16 - NestJS 10 - MongoDB (mongoose)',
				description: 'Kullanıcıların herhangi bir kod yazmadan çeşitli uygulamalar arasında entegrasyonlar kurmasını sağlayan kodsuz otomasyon platformu Monkedo\'nun geliştirme süreçlerinde en başından beri yer alıyorum; <a href="https://monkedo.com" target="_blank" class="text-primary">monkedo.com</a>. Sistemin hem arayüz hem de sunucu mimarisindeki süreçleri aktif olarak yönetiyorum.',
				thumb: 'assets/projects/monkedo.png',
				alt: 'Monkedo | Kodsuz Otomasyon',
			},
			{
				title: 'Pazar Yeri Sorgulama',
				period: 'Kasım 2024 - Günümüz',
				stack: 'Angular 21 - NestJS 11 - MongoDB (mongoose)',
				description: 'Semt pazarlarına modern bir erişim sağlamak, yerel üretici ile tüketiciyi buluşturmak amacıyla tamamen kendi tasarladığım bir web uygulaması; <a href="https://pazaryeribul.com" target="_blank" class="text-primary">pazaryeribul.com</a>. Akıllı filtreleme özellikleri, kullanıcı geri bildirim mekanizması ve yenilikçi arayüzü sayesinde pazar yerlerinin konum, gün ve adres bilgilerine hızlıca ulaşılabiliyor.',
				thumb: 'assets/projects/pazaryeribul.png',
				alt: 'Pazar Yeri Sorgulama',
			},
			{
				title: 'Kolay Pazar',
				period: '2026 - Günümüz',
				stack: 'Angular 21 - NestJS 11 - MongoDB (mongoose)',
				description: 'Marketlerin haftalık aktüel ürünlerini ve indirim kataloglarını tek bir merkezde toplayan akıllı takip platformu; <a href="https://kolay-pazar.store" target="_blank" class="text-primary">kolay-pazar.store</a>. Dış kaynaklardan veri çekme (web scraping) yöntemiyle çalışan sistem, güncel market indirimlerini lokasyon bazlı olarak kullanıcılara sunmaktadır. İlerleyen süreçte projeye yapay zeka destekli barkod okuma entegrasyonu eklenmesi de planlanmaktadır.',
				thumb: 'assets/projects/kolay-pazar.png',
				alt: 'Kolay Pazar',
			},
			{
				title: 'Oto-vs',
				period: 'Aralık 2025 - Günümüz',
				stack: 'Angular 21 - NestJS 11 - MongoDB (mongoose)',
				description: 'Yeni araç liste fiyatlarını takip etmek ve fiyat geçmişini görmek için geliştirdiğim bir uygulama; <a href="https://oto-vs.com" target="_blank" class="text-primary">oto-vs.com</a>. Marka, model ve paket bazında güncel fiyatları izleyebilir, zam veya indirim dönemlerini grafikte inceleyebilir, araçları yan yana fiyat karşılaştırması yapabilirsiniz.',
				thumb: 'assets/projects/oto-vs.png',
				alt: 'Oto-vs',
			},
			{
				title: 'HUBBM Not Paylaşım',
				period: 'Şubat 2019 - Ocak 2026',
				stack: 'Angular 21',
				description: 'Öğrencilik yıllarımda aldığım notları açmış olduğum bir blog sitesinde paylaşıyordum. Bu içerikleri kendi oluşturduğum bir alan adına taşımak istedim ve tasarımıyla birlikte yeni bir site oluşturdum; <a href="https://hubbm-not-paylasim.dev" target="_blank" class="text-primary">hubbm-not-paylasim.dev</a>.',
				thumb: 'assets/projects/hubbm-not-paylasim.png',
				alt: 'HUBBM Not Paylaşım',
			},
			{
				title: 'Proje Yönetimi İçin Doğal Dil İşleme Tabanlı Sanal Asistan',
				period: 'Ocak 2021 - Aralık 2022',
				stack: 'Angular 8 - Flask (Python) - SpaCy (Python)',
				description: 'Cubicl Proje ve Görev Takip projemiz içerisinden kullanıcıların günlük rutin olarak yaptığı işleri otomatize etmek amacıyla geliştirdiğimiz bir sanal asistan. Kullanıcılar, sanal asistana yazılı olarak isteklerini iletebilmektedir. Sanal asistan, kullanıcının isteğini anlayıp, gerekli işlemleri yapmaktadır.',
			},
			{
				title: 'Talaşlı İmalat Sektöründe Algoritma Temelli Üretim Planlaması Web Uygulaması',
				period: 'Ağustos 2020 - Aralık 2021',
				stack: 'Angular 8 - NestJS 8 - MongoDB (mongoose)',
				description: 'Bu proje kısaca bir Talaşlı İmalat Fabrikasında bir ürünün stok takibinden üretim aşamalarının tanımlanmasına, ürün bazında gerekli çalışan ve makinelerin belirlenmesinden en optimum üretim planmasını yapmaya kadar geçen süreci otomatize etmek amacıyla geliştirilen bir projedir.',
				thumb: 'assets/projects/uretim-planlamasi-1507.png',
				alt: 'Üretim Planlama Programı',
			},
			{
				title: 'Evcil Hayvan Sahiplendirme Projesi (Web Uygulaması)',
				period: 'Eylül 2019 - Haziran 2020',
				stack: 'React - Spring Boot 8 - MySQL - Hibernate',
				description: '2 arkadaşımla birlikte Bitirme projesi için geliştirdiğimiz bir platform. Hem kullanıcıların hem de barınakların bir çatı altında buluştuğu bir platform yapmaya çalıştık.',
			},
			{
				title: 'Evcil Hayvan Sahiplendirme Projesi (Mobil Uygulama)',
				period: 'Şubat 2020 - Haziran 2020',
				stack: 'React Native(Expo) - Spring Boot 8 - MySQL - Hibernate',
				description: 'Bitirme projemizin mobil uygulaması. Web sitemizi kullanan kullanıcılar ve barınaklara daha iyi bir deneyim sunabilmek için geliştirdiğimiz bir proje oldu.',
			},
			{
				title: 'Elektronik Ticaret Sitesi Projesi (Prototip)',
				period: 'Şubat 2019 - Haziran 2019',
				stack: 'React - Spring Boot 8 - Postgresql - Hibernate',
				description: 'Üniversite 3. sınıfta, 5 kişilik bir arkadaş grubuyla amatör de olsa bir "Elektronik Ticaret Sitesi" kurma fikriyle geliştirdiğimiz bir proje. Bu proje bir ekip içinde herkesin farklı görevlerinin olduğu ve fikir alışverişinde bulunabildiğim ilk büyük web projem oldu.',
			},
		],
		internships: [
			{
				company: 'İnnova Bilişim Çözümleri',
				location: 'ODTÜ Teknokent, Ankara, Türkiye',
				period: '08.2019 - 09.2019',
				role: 'Web Stajyeri',
				description: 'Vodafone için kurgulanan bir Sistem Yönetimi web uygulamasının geliştirme ekibinde yer aldım. Projenin mimarisinde backend tarafında Spring Boot, frontend tarafında ise Angular teknolojilerini kullanarak geliştirmelere katkı sağladım.'
			},
			{
				company: 'OBSS Teknoloji A.Ş',
				location: 'İstanbul Teknopark, İstanbul, Türkiye',
				period: '07.2019 - 08.2019',
				role: 'Web Stajyeri',
				description: 'Kurumsal Java mimarileri ve yazılım geliştirme süreçleri üzerine çalışmalar yürüttüm. Java SE ve Java EE standartlarına ek olarak Spring Framework altyapısını kullanarak projeler geliştirdim.'
			},
			{
				company: 'Türk Telekom A.Ş',
				location: 'Ankara, Türkiye',
				period: '06.2018 - 08.2018',
				role: 'Ağ Yönetim Sistemleri Stajyeri',
				description: 'Yaz stajımı Türk Telekom\'da yaptım. Türk Telekom, elektronik ve haberleşmede lider şirketlerden biridir. Staj sürem boyunca "Ağ Yönetim Sistemleri" bölümünde çalıştım. Staj sırasında Türkiye\'nin Ağ Altyapısı ve Ağ Protokolleri hakkında bilgi edinmiş oldum.',
			},
		],
		drawings,
	},
	en: {
		labels: {
			role: 'Software Engineer',
			contact: 'Contact',
			location: 'Ankara',
			nav: {
				home: 'About Me',
				homeShort: 'About',
				projects: 'Projects',
				internships: 'Internships',
				internshipsShort: 'Internships',
				hobbies: 'Hobbies',
			},
			theme: {
				light: 'Light Theme',
				dark: 'Dark Theme',
			},
			sections: {
				education: 'Education',
				work: 'Work Experience',
				projects: 'Projects',
				internships: 'Internships',
				hobbies: 'Hobbies',
				technologies: 'Technologies I Use',
			},
			gpa: 'GPA:',
			logoTitle: 'Abbreviation of Doğukan Berat Karataş',
			sendEmail: 'Send Email',
		},
		summary: 'I build full-stack web applications with Angular, NestJS, and Laravel. I take an active role across the entire process, from UI design and API development to database management, server setup, and deployment. Since 2020, I have been working at Z Software on products with real user bases such as Cubicl and Monkedo. In my spare time, I bring my own ideas to life through projects like Oto-vs, Pazaryeribul, and Kolay Pazar.',
		education: [
			{
				school: 'Hacettepe University',
				location: 'Ankara, Türkiye',
				period: '2015 - 2020',
				degree: 'Computer Engineering (100% English)',
				gpa: '3.00',
			},
			{
				school: 'Çağrıbey Anatolian High School',
				location: 'Ankara, Türkiye',
				period: '2011 - 2015',
				gpa: '88.54',
			},
		],
		work: [
			{
				company: 'Z Software Ltd.',
				location: 'METU Technopolis, Ankara, Türkiye',
				period: '2020 - Present',
				role: 'Software Engineer',
				description: 'I work as a full-stack developer on products with active user bases, such as Cubicl and Monkedo. I develop end-to-end web applications, taking an active role in UI (frontend) and API (backend) development, database management, and server deployment and maintenance processes. You can find details of the major projects I work on in the',
				descriptionLink: 'projects',
				descriptionAfter: ' section.',
			},
		],
		projects: [
			{
				title: 'Cubicl Task Management Software',
				period: 'August 2020 - Present',
				stack: 'Angular 17 - Laravel 9 - MongoDB (mongoose)',
				description: 'I work as a full-stack developer on the Cubicl platform, which simplifies project and task management for users; <a href="https://cubicl.io" target="_blank" class="text-primary">cubicl.io</a>. In addition to developing new features based on user feedback, I manage server updates and maintenance for our clients using the on-premise version.',
				thumb: 'assets/projects/cubicl.png',
				alt: 'Cubicl | Task Management',
			},
			{
				title: 'Monkedo No-Code Automation Platform',
				period: 'February 2023 - Present',
				stack: 'Angular 16 - NestJS 9 - MongoDB (mongoose)',
				description: 'I have been involved from the very beginning in the development of Monkedo, a no-code automation platform that allows users to create integrations between various applications without writing any code; <a href="https://monkedo.com" target="_blank" class="text-primary">monkedo.com</a>. I actively manage processes in both the UI and server architecture of the system.',
				thumb: 'assets/projects/monkedo.png',
				alt: 'Monkedo | No-Code Automation',
			},
			{
				title: 'Pazaryeribul.com',
				period: 'November 2024 - Present',
				stack: 'Angular 21 - NestJS 11 - MongoDB (mongoose)',
				description: 'A web application I designed entirely on my own to provide modern access to local street markets (bazaars) and connect local producers with consumers; <a href="https://pazaryeribul.com" target="_blank" class="text-primary">pazaryeribul.com</a>. Thanks to its smart filtering features, user feedback mechanism, and innovative interface, market location, day, and address information can be accessed quickly.', thumb: 'assets/projects/pazaryeribul.png',
				alt: 'Marketplace Lookup',
			},
			{
				title: 'Kolay Pazar',
				period: '2026 - Present',
				stack: 'Angular 21 - NestJS 11 - MongoDB (mongoose)',
				description: 'A smart tracking platform that aggregates weekly promotional products and discount catalogs from supermarkets into a single hub; <a href="https://kolay-pazar.store" target="_blank" class="text-primary">kolay-pazar.store</a>. Operating via web scraping, the system presents current supermarket discounts to users based on location. Future plans include adding an AI-supported barcode reading integration to the project.',
				thumb: 'assets/projects/kolay-pazar.png',
				alt: 'Kolay Pazar',
			},
			{
				title: 'Oto-vs',
				period: 'December 2025 - Present',
				stack: 'Angular 21 - NestJS 11 - MongoDB (mongoose)',
				description: 'An application I developed to track new vehicle list prices and view price history; <a href="https://oto-vs.com" target="_blank" class="text-primary">oto-vs.com</a>. You can monitor current prices by brand, model, and trim level, examine price increase or discount periods on a chart, and compare vehicle prices side-by-side.',
				thumb: 'assets/projects/oto-vs.png',
				alt: 'Oto-vs',
			},
			{
				title: 'HUBBM Notes Sharing',
				period: 'February 2019 - January 2026',
				stack: 'Angular 21',
				description: 'I used to share the notes I took during my student years on a blog site I had set up. I wanted to move this content to a custom domain name and created a new site with a fresh design; <a href="https://hubbm-not-paylasim.dev" target="_blank" class="text-primary">hubbm-not-paylasim.dev</a>.',
				thumb: 'assets/projects/hubbm-not-paylasim.png',
				alt: 'HUBBM Notes Sharing',
			},
			{
				title: 'NLP-Based Virtual Assistant for Project Management',
				period: 'January 2021 - December 2022',
				stack: 'Angular 8 - Flask (Python) - SpaCy (Python)',
				description: 'A virtual assistant we developed within the Cubicl project to automate users\' daily routine tasks. Users can send written requests to the assistant, which understands the intent and performs the required actions.',
			},
			{
				title: 'Algorithm-Based Production Planning Web App for Machining Industry',
				period: 'August 2020 - December 2021',
				stack: 'Angular 8 - NestJS 8 - MongoDB (mongoose)',
				description: 'This project automates the process in a machining factory, from inventory tracking and defining production stages to determining required workers and machines, and creating optimal production plans.',
				thumb: 'assets/projects/uretim-planlamasi-1507.png',
				alt: 'Production Planning Application',
			},
			{
				title: 'Pet Adoption Project (Web Application)',
				period: 'September 2019 - June 2020',
				stack: 'React - Spring Boot 8 - MySQL - Hibernate',
				description: 'A platform we developed with two friends as our graduation project. We aimed to bring users and shelters together under one roof.',
			},
			{
				title: 'Pet Adoption Project (Mobile Application)',
				period: 'February 2020 - June 2020',
				stack: 'React Native (Expo) - Spring Boot 8 - MySQL - Hibernate',
				description: 'The mobile app for our graduation project, built to provide a better experience for users and shelters using our website.',
			},
			{
				title: 'E-Commerce Site Project (Prototype)',
				period: 'February 2019 - June 2019',
				stack: 'React - Spring Boot 8 - PostgreSQL - Hibernate',
				description: 'In my third year at university, our group of five developed this project with the idea of building an e-commerce site. It was my first large web project where everyone had different roles and we exchanged ideas as a team.',
			},
		],
		internships: [
			{
				company: 'Innova Information Solutions',
				location: 'METU Technopolis, Ankara, Türkiye',
				period: '08.2019 - 09.2019',
				role: 'Web Intern',
				description: 'I took part in the development of a System Management web application designed for Vodafone. I actively contributed to the project using Angular for the frontend architecture and Spring Boot for the backend.'
			},
			{
				company: 'OBSS Technology Inc.',
				location: 'Istanbul Technopark, Istanbul, Türkiye',
				period: '07.2019 - 08.2019',
				role: 'Web Intern',
				description: 'I worked on enterprise Java technologies and software development practices. I developed projects and gained practical experience utilizing Java SE, Java EE, and the Spring Framework.'
			},
			{
				company: 'Türk Telekom Inc.',
				location: 'Ankara, Türkiye',
				period: '06.2018 - 08.2018',
				role: 'Network Management Systems Intern',
				description: 'I completed my summer internship at Türk Telekom, one of the leading companies in electronics and telecommunications. I worked in the Network Management Systems department and learned about Türkiye\'s network infrastructure and protocols.',
			},
		],
		drawings,
	},
};
