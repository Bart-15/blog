import Head from 'next/Head'

const HeadTitle = ({title}) => {
    return ( 
        <Head>
             <title>Blog - {title}</title>
             <link rel="icon" href="/favicon.ico" />
        </Head>
     );
}
 
export default HeadTitle;