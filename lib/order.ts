export function calculateBagsWeight(bags: (null|number)[]){
	return Number(bags.reduce((a: number, v)=>v ? Number(v)+a : a, 0).toFixed(2));
}
