import puppeteer from "puppeteer";
import waitOn from "wait-on";

const URL = "http://localhost:5173";

(async () => {
  try {
    // Espera a URL ficar disponível (até 30 segundos)
    await waitOn({ resources: [URL], timeout: 30000 });
    console.log(`✅ ${URL} está online, iniciando Puppeteer...`);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Acessa o site
    await page.goto(URL, { waitUntil: "networkidle0" });

    // Define tamanho da tela
    await page.setViewport({ width: 1280, height: 800 });

    // Tira screenshot e salva na raiz do projeto
    await page.screenshot({ path: "screenshot-dashboard.png" });

    await browser.close();
    console.log("✅ Screenshot criada: screenshot-dashboard.png");
  } catch (err) {
    console.error("❌ Erro ao gerar screenshot:", err);
  }
})();