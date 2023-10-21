import { Providers } from '@/redux/provider';
import './globals.scss';
import { publicSans } from '../fonts/fonts';
//===========================================================================================================

export const metadata = {
	title: 'NextJS - Real Chat',
	description: 'Created by HexFaiR',
};

export default function RootLayout({ children, }: { children: React.ReactNode }) {
	return (
		<html lang='ru'>
			<body className={publicSans.className}>
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	);
}
