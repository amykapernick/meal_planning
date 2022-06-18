import Helmet from "react-helmet";
import { useContext } from "react";

import PageContext from "../../../../_data/context/pageContext";

const Meta = () => {
	const { pageContext: { title, description } } = useContext(PageContext)

	return (
		<Helmet>
			<link rel="shortcut icon" href="{{env.siteUrl}}{{favicon}}" />
			<link rel="shortcut icon" href="{{env.siteUrl}}{{favicon}}" />
			<link rel="icon" sizes="192x192" href="{{env.siteUrl}}{{favicon}}" />
			<link rel="apple-touch-icon" href="{{env.siteUrl}}{{favicon}}" />
			<meta name="theme-color" content="#9440a0" />
			<link rel="mask-icon" href="{{env.siteUrl}}{{favicon}}" color="#9440a0" />
			<base href="{{env.siteUrl}}/" />
		
			<title>{title}</title>
			<meta name="description" content={description} />
		
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content="{{env.siteUrl}}/img/socials/default.png" />
			<meta name="author" content="Amy Kapernick" />
			<meta property="og:url" content="{{env.siteUrl}}{{permalink}}" />
		
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content="@amys_kapers" />
			<meta property="twitter:image" content="{{env.siteUrl}}/img/socials/default.png" />
			<meta name="twitter:creator" content="@amys_kapers" />
			<meta property="twitter:title" content={title} />
			<meta property="twitter:description" content={description} />
		</Helmet>
	)
}

export default Meta