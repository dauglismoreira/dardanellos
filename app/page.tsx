import { HomeBanner } from "./components/ui/homeBanner";
import fetchData from '@/app/components/helpers/fetchData';
import getStorageFile from '@/app/components/helpers/getStorageFile';
import { HomeEnterprise } from "./components/ui/homeEnterprises";
import { HomeAbout } from "./components/ui/homeAbout";
import { HomeOppBanner } from "./components/ui/homeOppBanner";

export async function generateMetadata() {
  const data = await  fetchData('page/1')

  return {
      title: data?.page?.name_pt_br ?? '',
      description: data?.page?.seo_description_pt_br ?? '',
        openGraph: {
          title: data?.page?.name_pt_br ?? '',
          description: data?.page?.seo_description_pt_br ?? '',
          images: [{
            url: getStorageFile(data?.page?.square_image?.src) ?? '/share_placeholder.jpg',
          },]
        },
        twitter: {
          // @ts-ignore
          image: getStorageFile(data?.page?.square_image?.src) ?? '/share_placeholder.jpg'
        },
    }
  }

export default async function Home() {
  const data = await fetchData('page/1')
  const products = await fetchData('product')

  return (
    <main>
     <HomeBanner data={data.page.components[0]} cta={data.page.components[1]}/>
     <HomeEnterprise data={data.page.components[2]} products={products.products.data}/>
     <HomeAbout image={data.page.components[3]} data={data.page.components[4]}/>
     <HomeOppBanner data={data.page.components[5]}/>
    </main>
  );
}
