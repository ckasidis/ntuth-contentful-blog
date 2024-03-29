import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { IGuide } from '../../@types/generated/contentful';
import PageNotFound from '../404';
import Blog from '../../components/Blog';
import ctfClient from '../../lib/contentful';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const res = await ctfClient.getEntries({
		content_type: 'guide',
		'fields.slug': params!.id,
	});

	return {
		props: {
			guide: res.items.length ? res.items[0] : null,
		},
	};
};

interface GuideSingleProps {
	guide: IGuide | null;
}

export default function GuideSingle({ guide }: GuideSingleProps) {
	if (!guide) return <PageNotFound />;

	const { title, featuredImage, mainContent, author } = guide.fields;

	return (
		<main>
			<Head>
				<title>{title}</title>
			</Head>
			<Blog
				category="guide"
				title={title}
				image={featuredImage}
				content={mainContent}
				author={author}
				dateTimeStr={guide.sys.updatedAt}
			/>
		</main>
	);
}
