import { calculateBagsWeight } from '~/lib/order';

export default function(){
	const bags = ref<(null|number)[]>([null]);
	const total_bag = computed(()=>bags.value.filter(bag=>bag && bag>0).length);
	const total_weight = computed(()=>calculateBagsWeight(bags.value));
	function deleteBag(key: number){
		delete bags.value[key];
		bags.value = bags.value.filter(v=>v!==undefined);
	}
	return {bags, total_bag, total_weight, deleteBag};
}
