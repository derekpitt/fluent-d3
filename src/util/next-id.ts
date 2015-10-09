let idIncr = 0;
export default function nextId(name = "") {
    idIncr += 1;
    return `${name}-${idIncr}`;
}
