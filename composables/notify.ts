import { notify } from '@kyvg/vue3-notification';

export default {
	info(title: string){
		notify({
			title,
			type: 'info'
		})
	},
	warning(title: string){
		notify({
			title,
			type: 'warning'
		})
	},
	error(title: string){
		notify({
			title,
			type: 'error'
		})
	},
	success(title: string){
		notify({
			title,
			type: 'success'
		})
	},
	underDevelopment(){
		notify({
			title: 'This is under development',
			type: 'info'
		})
	}
};
