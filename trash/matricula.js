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
    let text = decoder.decode(buffer)

    return text
}

let oks = []
async function fetchAll(usuario, newIds=null) {
    if(!usuario) return [];
    const re = usuario.toUpperCase().replaceAll(' ', "\r\n")
    
    const errors = []
    let ids = !newIds ? filterIds(tbodyText) : newIds

    const promises = await Promise.allSettled(ids.map(id=> fetchFrom(id)))
    promises.forEach((promise,idx) => {
            let response = promise.value
            let parser = new DOMParser();
            let htmlDoc = parser.parseFromString(response, 'text/html')
            if(response.match(/Foi detectado um excesso de requisições/g)){
                errors.push(ids[idx])
            }
            if (response && response.match(re)) {
                oks.push(objectFrom(htmlDoc))
            }
    })
    console.log(oks)
    if(errors.length !== 0){
        console.log("Trying again in 10s in these ids: ",errors)
        await new Promise(r => setTimeout(r, 5000))
        await fetchAll(usuario, errors)
    } 
    return oks
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