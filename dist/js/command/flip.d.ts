declare const command: {
    name: string;
    execute(graphics: any, type: any): any;
    undo(graphics: any): any;
};
export default command;
