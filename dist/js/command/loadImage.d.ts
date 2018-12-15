declare const command: {
    name: string;
    execute(graphics: any, imageName: any, imgUrl: any): any;
    undo(graphics: any): any;
};
export default command;
