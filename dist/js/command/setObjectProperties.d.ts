declare const command: {
    name: string;
    execute(graphics: any, id: any, props: any): any;
    undo(graphics: any, id: any): any;
};
export default command;
