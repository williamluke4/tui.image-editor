declare const command: {
    name: string;
    execute(graphics: any, object: any): any;
    undo(graphics: any, object: any): any;
};
export default command;
