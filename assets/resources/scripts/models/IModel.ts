
/*
模型的约定接口，模型的生命周期和对应的View绑定，在对应的View的onLoad和onDestroy里分别调用模型的
Load和Destroy,可以参考LoginView.ts
*/
export default interface IModel {
    load();
    destroy();
}