declare const command: {
    name: string;
    execute(graphics: any, id: any, posInfo: any): any;
    undo(graphics: any): any;
};
export default command;
