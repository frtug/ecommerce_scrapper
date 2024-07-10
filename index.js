//adding Puppeteer library
const pt = require('puppeteer');
const https = require('https');
const userAgent = require('fake-useragent');

async function getAllLinks(){
    try {
        const res = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=kregtRD6V1C4tHl1HBn_ZZfdL-MsoZXdQoH8FwLAaZEFLSymRVSSlUyYNoIaC3t6ePt2EeHnDu5ecIUt-gkT80C_znAU2YJ8m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnDqXs0Bda4eSwF-RhtIAN_Rnkh5c3qkpsuvYLGUZp_GPSy3Q10aupiagVAskv_T2LEXmYnvwxDphqKBZppb2wtC9dkyEvGFqsw&lib=MfY7ncTupWe8cHuExzgSvh86idZU4jP8o');
        const headerDate = res.headers && res.headers.get('date') ? res.headers.get('date') : 'no response date';
        console.log('Status Code:', res.status);
        console.log('Date in Response header:', headerDate);
    
        const data = await res.json();
        return data
       
      } catch (err) {
        console.log(err.message); //can be console.error
      }
};
pt.launch().then(async browser => {
   //browser new page
   const p = await browser.newPage();
   //set viewpoint of browser page
   await p.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36')
   
   await p.setViewport({ width: 1000, height: 900 })
   await p.setExtraHTTPHeaders({
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Accept-Language': 'en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection':'keep-alive',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1'
  });
   //launch URL
    const links = (await getAllLinks())[3]
            
for(const value of links.data){
  console.log(value.Url)
  await p.goto(value.Url)
   //capture screenshot
  try {
    console.log(p)
  const el = await p.waitForSelector("css-1jczs19");
  const price = await el.evaluate(el => el.innerText);

  console.log(price);
  } catch (error) {
    if (error.name === 'TimeoutError' || error.name === 'NavigationError') {
      console.error("Navigation failed:", error.message);
    } else {
      throw error;  // Re-throw other errors
    }  }
}  
   

//    await p.screenshot({
//       path: 'amazon.png'
//    });
   //browser close
   await browser.close()
})