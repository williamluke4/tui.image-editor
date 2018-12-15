declare const command: {
    name: string;
    execute(graphics: any, text: any, options: any): any;
    undo(graphics: any): any;
};
export default command;
