declare const command: {
    name: string;
    execute(graphics: any, id: any, text: any): any;
    undo(graphics: any): any;
};
export default command;
