import { useIMask } from 'vue-imask';

export default function(){
	const {el, masked, unmasked} = useIMask({
		mask: [{mask: '000'}, {mask: '(000) 000-0000'}]
	})

	function phonePaste(e: ClipboardEvent){
		const selection = getSelection()?.toString()?.replace(/[^\d]+/g, '');
		if(selection && selection.length===10) unmasked.value = '';
		if(unmasked.value.length!==0) return false;
		let phone = e.clipboardData?.getData('text/plain');
		if(phone){
			phone = phone.replace(/[^\d]+/g, '');
			if(phone.length===11) phone = phone.replace(/^1/, '');
			if(phone.length===10) unmasked.value = phone;
		}
	}

	return { el, masked, unmasked, phonePaste }
}
