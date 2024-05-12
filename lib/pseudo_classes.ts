import plugin from 'tailwindcss/plugin';

export default plugin(function({addComponents}){
	addComponents({
		'.input-float': {},
		'.input-float2': {},
		'.multiselect-dropdown-separate': {}
	})
});
