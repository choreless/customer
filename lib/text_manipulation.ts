export function toSplitted(s: string, regexp: RegExp){
	const result: {text: string, is_match: boolean}[] = [];
	const no_matches = s.split(regexp);
	const matches = s.match(regexp) ?? [];
	while(no_matches.length || matches.length){
		const no_match = no_matches.shift();
		if(no_match) result.push({text: no_match, is_match: false});
		const match = matches.shift();
		if(match) result.push({text: match, is_match: true});
	}
	return result;
}
