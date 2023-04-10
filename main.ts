import { fetchEventSource } from '@microsoft/fetch-event-source';

const ctrl = new AbortController();

const response = await fetchEventSource('https://openai-proxy.yuler.dev/v1/chat/completions', {
    method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		'Authorization': `Bearer xxx`,
	},
    body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        frequency_penalty: 0,
        stream: true,
        presence_penalty: 0,
        max_tokens: 200,
        n: 1,
        temperature: 0.5,
        messages: [{ role: 'user', content: '写一首诗, 20 字' }],
    }),
	signal: ctrl.signal,
	onmessage(ev) {
        console.log(ev.data);
    }
}) as any

// if (response.body) {
// 	const reader = response.body.getReader()
// 	const decoder = new TextDecoder()


// 	while (true) {
// 		const { value, done } = await reader.read()
		
// 		if (done) {
// 			break
// 		}
		
// 		const result = decoder.decode(value, { stream: true })
// 		if (result === 'data: [DONE]') {
// 			break
// 		}

// 		// const data = result.slice('data: '.length)
// 		console.log(result)
// 		// console.log('Received chunk:', JSON.parse(data))
// 	}
// }
