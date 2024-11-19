const world = 'world';

export async function hello(who: string = world): Promise<string> {
    console.log(world)
    console.log("test2")
    return `Hello ${who}! `;
}

hello();
