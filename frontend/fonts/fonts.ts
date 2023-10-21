import localFont from 'next/font/local';
//===========================================================================================================

export const publicSans = localFont({
	src: [
		{ path: '../public/fonts/PublicSans-Medium.woff2', weight: '500', style: 'normal', },
		{ path: '../public/fonts/PublicSans-SemiBold.woff2', weight: '600', style: 'normal', },
		{ path: '../public/fonts/PublicSans-Bold.woff2', weight: '700', style: 'normal', },
		{ path: '../public/fonts/PublicSans-ExtraBold.woff2', weight: '800', style: 'normal', },
		{ path: '../public/fonts/PublicSans-MediumItalic.woff2', weight: '500', style: 'italic', },
	]
});

