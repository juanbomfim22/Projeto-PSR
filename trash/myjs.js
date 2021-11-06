const styles = `
    font-size: 1.9em;
    color: #003395;
    font-variant: small-caps;
    margin: 0 0px 15px;
    border-bottom: 1px solid #C4D2EB;
    padding: 4px 0 2px 22px;
    letter-spacing: 0px;
    text-align: left;
    background: #EFF3FA;
`
const tbodyText = $x('//*[@id="lista-turmas"]/tbody')[0].outerHTML

const filterIds = txt => {
    const ids = []
    if (txt.match(/\d{6}/g) === null) return []
    txt.match(/\d{6}/g)
        .sort()
        .forEach((x, id) => id % 3 == 0 ? ids.push(x) : null)
    return ids
}

function zip(keysArr, valuesArr, out = {}) {
    keysArr.map((val, idx) => out[val] = valuesArr[idx] || 0)
    return out;
}


function objectFrom(htmlDoc) {
    const titles = ["Componente Curricular", "Turma", "Horário", "Capacidade", "Vagas Deferidas", "Vagas Restantes Ingressantes", "Vagas Restantes"]

    let infos = htmlDoc.evaluate('//*[@id="content"]/table[1]/tbody/tr/td[1]/table', htmlDoc)
        .iterateNext().innerText
        .split(/Componente\nCurricular|Turma|Horário|Capacidade|Vagas\nDeferidas|Vagas\nRestantes|Ingressantes/g)
        .filter(x => x !== '\n').map(x => { x = x.replaceAll("\n", " ").trim(); return isFinite(x) ? parseInt(x) : x; })

    return zip(titles, infos)
}

async function fetchFrom(id) {
    const response = await fetch(`/sigaa/relatorioProcessamento?idTurma=${id}`)
    const buffer = await response.arrayBuffer()


    let decoder = new TextDecoder("iso-8859-1")
    let promise = decoder.decode(buffer)

    let parser = new DOMParser();
    let htmlDoc = parser.parseFromString(promise.value, 'text/html')
    console.log({ k: promise.value })
    if (promise.value && promise.value.match(re)) {
        infos.push(objectFrom(htmlDoc))
    }
    console.log("Entering random delay...")
    const randomDelay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
    return promise;

}


async function fetchAll(usuario) {
    const re = usuario.replaceAll(' ', "\r\n")
    const infos = []
    const ids = filterIds(tbodyText)

    const arrayOfPromises = ids.map(id => await fetchFrom(id))
    const promises = await Promise.allSettled()

    const randomDelay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 1000));

    const unresolvedPromises = ids.map(id => fetchFrom(ids))
    const results = await Promise.all(unresolvedPromises)

    return promises
    // const promises = await Promise.allSettled(ids.map(async id => {
    //     let promise = await fetchFrom(id)
    //     let parser = new DOMParser();
    //     let htmlDoc = parser.parseFromString(promise.value, 'text/html')
    //     console.log({ k: promise.value })
    //     if (promise.value && promise.value.match(re)) {
    //         infos.push(objectFrom(htmlDoc))
    //     }
    //     let comm = await new Promise(resolve => setTimeout(resolve, 3000))
    //     console.log(comm)
    //     return promise;
    // })

    // promises.forEach(promise => {
    //     let parser = new DOMParser();
    //     let htmlDoc = parser.parseFromString(promise.value, 'text/html')
    //     console.log({ k: promise.value })
    //     if (promise.value && promise.value.match(re)) {
    //         infos.push(objectFrom(htmlDoc))
    //     }

    // })
    // return infos
}


async function showResults() {

    let user = window.prompt("Digite a matrícula ou o nome do aluno: ")
    let result = await fetchAll(user)

    console.log(`%c Usuário: ${user} `, styles)
    result.length === 0 ?
        console.log("%c Nenhuma ocorrência encontrada ", styles) :
        console.table(result)
}

showResults()