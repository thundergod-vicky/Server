import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type QuestionSetModel = runtime.Types.Result.DefaultSelection<Prisma.$QuestionSetPayload>;
export type AggregateQuestionSet = {
    _count: QuestionSetCountAggregateOutputType | null;
    _min: QuestionSetMinAggregateOutputType | null;
    _max: QuestionSetMaxAggregateOutputType | null;
};
export type QuestionSetMinAggregateOutputType = {
    id: string | null;
    lessonId: string | null;
};
export type QuestionSetMaxAggregateOutputType = {
    id: string | null;
    lessonId: string | null;
};
export type QuestionSetCountAggregateOutputType = {
    id: number;
    lessonId: number;
    questions: number;
    _all: number;
};
export type QuestionSetMinAggregateInputType = {
    id?: true;
    lessonId?: true;
};
export type QuestionSetMaxAggregateInputType = {
    id?: true;
    lessonId?: true;
};
export type QuestionSetCountAggregateInputType = {
    id?: true;
    lessonId?: true;
    questions?: true;
    _all?: true;
};
export type QuestionSetAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionSetWhereInput;
    orderBy?: Prisma.QuestionSetOrderByWithRelationInput | Prisma.QuestionSetOrderByWithRelationInput[];
    cursor?: Prisma.QuestionSetWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | QuestionSetCountAggregateInputType;
    _min?: QuestionSetMinAggregateInputType;
    _max?: QuestionSetMaxAggregateInputType;
};
export type GetQuestionSetAggregateType<T extends QuestionSetAggregateArgs> = {
    [P in keyof T & keyof AggregateQuestionSet]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateQuestionSet[P]> : Prisma.GetScalarType<T[P], AggregateQuestionSet[P]>;
};
export type QuestionSetGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionSetWhereInput;
    orderBy?: Prisma.QuestionSetOrderByWithAggregationInput | Prisma.QuestionSetOrderByWithAggregationInput[];
    by: Prisma.QuestionSetScalarFieldEnum[] | Prisma.QuestionSetScalarFieldEnum;
    having?: Prisma.QuestionSetScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: QuestionSetCountAggregateInputType | true;
    _min?: QuestionSetMinAggregateInputType;
    _max?: QuestionSetMaxAggregateInputType;
};
export type QuestionSetGroupByOutputType = {
    id: string;
    lessonId: string;
    questions: runtime.JsonValue;
    _count: QuestionSetCountAggregateOutputType | null;
    _min: QuestionSetMinAggregateOutputType | null;
    _max: QuestionSetMaxAggregateOutputType | null;
};
type GetQuestionSetGroupByPayload<T extends QuestionSetGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<QuestionSetGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof QuestionSetGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], QuestionSetGroupByOutputType[P]> : Prisma.GetScalarType<T[P], QuestionSetGroupByOutputType[P]>;
}>>;
export type QuestionSetWhereInput = {
    AND?: Prisma.QuestionSetWhereInput | Prisma.QuestionSetWhereInput[];
    OR?: Prisma.QuestionSetWhereInput[];
    NOT?: Prisma.QuestionSetWhereInput | Prisma.QuestionSetWhereInput[];
    id?: Prisma.StringFilter<"QuestionSet"> | string;
    lessonId?: Prisma.StringFilter<"QuestionSet"> | string;
    questions?: Prisma.JsonFilter<"QuestionSet">;
    lesson?: Prisma.XOR<Prisma.LessonScalarRelationFilter, Prisma.LessonWhereInput>;
};
export type QuestionSetOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    lessonId?: Prisma.SortOrder;
    questions?: Prisma.SortOrder;
    lesson?: Prisma.LessonOrderByWithRelationInput;
};
export type QuestionSetWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    lessonId?: string;
    AND?: Prisma.QuestionSetWhereInput | Prisma.QuestionSetWhereInput[];
    OR?: Prisma.QuestionSetWhereInput[];
    NOT?: Prisma.QuestionSetWhereInput | Prisma.QuestionSetWhereInput[];
    questions?: Prisma.JsonFilter<"QuestionSet">;
    lesson?: Prisma.XOR<Prisma.LessonScalarRelationFilter, Prisma.LessonWhereInput>;
}, "id" | "lessonId">;
export type QuestionSetOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    lessonId?: Prisma.SortOrder;
    questions?: Prisma.SortOrder;
    _count?: Prisma.QuestionSetCountOrderByAggregateInput;
    _max?: Prisma.QuestionSetMaxOrderByAggregateInput;
    _min?: Prisma.QuestionSetMinOrderByAggregateInput;
};
export type QuestionSetScalarWhereWithAggregatesInput = {
    AND?: Prisma.QuestionSetScalarWhereWithAggregatesInput | Prisma.QuestionSetScalarWhereWithAggregatesInput[];
    OR?: Prisma.QuestionSetScalarWhereWithAggregatesInput[];
    NOT?: Prisma.QuestionSetScalarWhereWithAggregatesInput | Prisma.QuestionSetScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"QuestionSet"> | string;
    lessonId?: Prisma.StringWithAggregatesFilter<"QuestionSet"> | string;
    questions?: Prisma.JsonWithAggregatesFilter<"QuestionSet">;
};
export type QuestionSetCreateInput = {
    id?: string;
    questions: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    lesson: Prisma.LessonCreateNestedOneWithoutQuestionSetInput;
};
export type QuestionSetUncheckedCreateInput = {
    id?: string;
    lessonId: string;
    questions: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type QuestionSetUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    lesson?: Prisma.LessonUpdateOneRequiredWithoutQuestionSetNestedInput;
};
export type QuestionSetUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lessonId?: Prisma.StringFieldUpdateOperationsInput | string;
    questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type QuestionSetCreateManyInput = {
    id?: string;
    lessonId: string;
    questions: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type QuestionSetUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type QuestionSetUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lessonId?: Prisma.StringFieldUpdateOperationsInput | string;
    questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type QuestionSetNullableScalarRelationFilter = {
    is?: Prisma.QuestionSetWhereInput | null;
    isNot?: Prisma.QuestionSetWhereInput | null;
};
export type QuestionSetCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    lessonId?: Prisma.SortOrder;
    questions?: Prisma.SortOrder;
};
export type QuestionSetMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    lessonId?: Prisma.SortOrder;
};
export type QuestionSetMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    lessonId?: Prisma.SortOrder;
};
export type QuestionSetCreateNestedOneWithoutLessonInput = {
    create?: Prisma.XOR<Prisma.QuestionSetCreateWithoutLessonInput, Prisma.QuestionSetUncheckedCreateWithoutLessonInput>;
    connectOrCreate?: Prisma.QuestionSetCreateOrConnectWithoutLessonInput;
    connect?: Prisma.QuestionSetWhereUniqueInput;
};
export type QuestionSetUncheckedCreateNestedOneWithoutLessonInput = {
    create?: Prisma.XOR<Prisma.QuestionSetCreateWithoutLessonInput, Prisma.QuestionSetUncheckedCreateWithoutLessonInput>;
    connectOrCreate?: Prisma.QuestionSetCreateOrConnectWithoutLessonInput;
    connect?: Prisma.QuestionSetWhereUniqueInput;
};
export type QuestionSetUpdateOneWithoutLessonNestedInput = {
    create?: Prisma.XOR<Prisma.QuestionSetCreateWithoutLessonInput, Prisma.QuestionSetUncheckedCreateWithoutLessonInput>;
    connectOrCreate?: Prisma.QuestionSetCreateOrConnectWithoutLessonInput;
    upsert?: Prisma.QuestionSetUpsertWithoutLessonInput;
    disconnect?: Prisma.QuestionSetWhereInput | boolean;
    delete?: Prisma.QuestionSetWhereInput | boolean;
    connect?: Prisma.QuestionSetWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.QuestionSetUpdateToOneWithWhereWithoutLessonInput, Prisma.QuestionSetUpdateWithoutLessonInput>, Prisma.QuestionSetUncheckedUpdateWithoutLessonInput>;
};
export type QuestionSetUncheckedUpdateOneWithoutLessonNestedInput = {
    create?: Prisma.XOR<Prisma.QuestionSetCreateWithoutLessonInput, Prisma.QuestionSetUncheckedCreateWithoutLessonInput>;
    connectOrCreate?: Prisma.QuestionSetCreateOrConnectWithoutLessonInput;
    upsert?: Prisma.QuestionSetUpsertWithoutLessonInput;
    disconnect?: Prisma.QuestionSetWhereInput | boolean;
    delete?: Prisma.QuestionSetWhereInput | boolean;
    connect?: Prisma.QuestionSetWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.QuestionSetUpdateToOneWithWhereWithoutLessonInput, Prisma.QuestionSetUpdateWithoutLessonInput>, Prisma.QuestionSetUncheckedUpdateWithoutLessonInput>;
};
export type QuestionSetCreateWithoutLessonInput = {
    id?: string;
    questions: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type QuestionSetUncheckedCreateWithoutLessonInput = {
    id?: string;
    questions: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type QuestionSetCreateOrConnectWithoutLessonInput = {
    where: Prisma.QuestionSetWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuestionSetCreateWithoutLessonInput, Prisma.QuestionSetUncheckedCreateWithoutLessonInput>;
};
export type QuestionSetUpsertWithoutLessonInput = {
    update: Prisma.XOR<Prisma.QuestionSetUpdateWithoutLessonInput, Prisma.QuestionSetUncheckedUpdateWithoutLessonInput>;
    create: Prisma.XOR<Prisma.QuestionSetCreateWithoutLessonInput, Prisma.QuestionSetUncheckedCreateWithoutLessonInput>;
    where?: Prisma.QuestionSetWhereInput;
};
export type QuestionSetUpdateToOneWithWhereWithoutLessonInput = {
    where?: Prisma.QuestionSetWhereInput;
    data: Prisma.XOR<Prisma.QuestionSetUpdateWithoutLessonInput, Prisma.QuestionSetUncheckedUpdateWithoutLessonInput>;
};
export type QuestionSetUpdateWithoutLessonInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type QuestionSetUncheckedUpdateWithoutLessonInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type QuestionSetSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    lessonId?: boolean;
    questions?: boolean;
    lesson?: boolean | Prisma.LessonDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["questionSet"]>;
export type QuestionSetSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    lessonId?: boolean;
    questions?: boolean;
    lesson?: boolean | Prisma.LessonDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["questionSet"]>;
export type QuestionSetSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    lessonId?: boolean;
    questions?: boolean;
    lesson?: boolean | Prisma.LessonDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["questionSet"]>;
export type QuestionSetSelectScalar = {
    id?: boolean;
    lessonId?: boolean;
    questions?: boolean;
};
export type QuestionSetOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "lessonId" | "questions", ExtArgs["result"]["questionSet"]>;
export type QuestionSetInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lesson?: boolean | Prisma.LessonDefaultArgs<ExtArgs>;
};
export type QuestionSetIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lesson?: boolean | Prisma.LessonDefaultArgs<ExtArgs>;
};
export type QuestionSetIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lesson?: boolean | Prisma.LessonDefaultArgs<ExtArgs>;
};
export type $QuestionSetPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "QuestionSet";
    objects: {
        lesson: Prisma.$LessonPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        lessonId: string;
        questions: runtime.JsonValue;
    }, ExtArgs["result"]["questionSet"]>;
    composites: {};
};
export type QuestionSetGetPayload<S extends boolean | null | undefined | QuestionSetDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$QuestionSetPayload, S>;
export type QuestionSetCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<QuestionSetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: QuestionSetCountAggregateInputType | true;
};
export interface QuestionSetDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['QuestionSet'];
        meta: {
            name: 'QuestionSet';
        };
    };
    findUnique<T extends QuestionSetFindUniqueArgs>(args: Prisma.SelectSubset<T, QuestionSetFindUniqueArgs<ExtArgs>>): Prisma.Prisma__QuestionSetClient<runtime.Types.Result.GetResult<Prisma.$QuestionSetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends QuestionSetFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, QuestionSetFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuestionSetClient<runtime.Types.Result.GetResult<Prisma.$QuestionSetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends QuestionSetFindFirstArgs>(args?: Prisma.SelectSubset<T, QuestionSetFindFirstArgs<ExtArgs>>): Prisma.Prisma__QuestionSetClient<runtime.Types.Result.GetResult<Prisma.$QuestionSetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends QuestionSetFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, QuestionSetFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__QuestionSetClient<runtime.Types.Result.GetResult<Prisma.$QuestionSetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends QuestionSetFindManyArgs>(args?: Prisma.SelectSubset<T, QuestionSetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionSetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends QuestionSetCreateArgs>(args: Prisma.SelectSubset<T, QuestionSetCreateArgs<ExtArgs>>): Prisma.Prisma__QuestionSetClient<runtime.Types.Result.GetResult<Prisma.$QuestionSetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends QuestionSetCreateManyArgs>(args?: Prisma.SelectSubset<T, QuestionSetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends QuestionSetCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, QuestionSetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionSetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends QuestionSetDeleteArgs>(args: Prisma.SelectSubset<T, QuestionSetDeleteArgs<ExtArgs>>): Prisma.Prisma__QuestionSetClient<runtime.Types.Result.GetResult<Prisma.$QuestionSetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends QuestionSetUpdateArgs>(args: Prisma.SelectSubset<T, QuestionSetUpdateArgs<ExtArgs>>): Prisma.Prisma__QuestionSetClient<runtime.Types.Result.GetResult<Prisma.$QuestionSetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends QuestionSetDeleteManyArgs>(args?: Prisma.SelectSubset<T, QuestionSetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends QuestionSetUpdateManyArgs>(args: Prisma.SelectSubset<T, QuestionSetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends QuestionSetUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, QuestionSetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QuestionSetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends QuestionSetUpsertArgs>(args: Prisma.SelectSubset<T, QuestionSetUpsertArgs<ExtArgs>>): Prisma.Prisma__QuestionSetClient<runtime.Types.Result.GetResult<Prisma.$QuestionSetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends QuestionSetCountArgs>(args?: Prisma.Subset<T, QuestionSetCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], QuestionSetCountAggregateOutputType> : number>;
    aggregate<T extends QuestionSetAggregateArgs>(args: Prisma.Subset<T, QuestionSetAggregateArgs>): Prisma.PrismaPromise<GetQuestionSetAggregateType<T>>;
    groupBy<T extends QuestionSetGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: QuestionSetGroupByArgs['orderBy'];
    } : {
        orderBy?: QuestionSetGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, QuestionSetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionSetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: QuestionSetFieldRefs;
}
export interface Prisma__QuestionSetClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    lesson<T extends Prisma.LessonDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LessonDefaultArgs<ExtArgs>>): Prisma.Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface QuestionSetFieldRefs {
    readonly id: Prisma.FieldRef<"QuestionSet", 'String'>;
    readonly lessonId: Prisma.FieldRef<"QuestionSet", 'String'>;
    readonly questions: Prisma.FieldRef<"QuestionSet", 'Json'>;
}
export type QuestionSetFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSetSelect<ExtArgs> | null;
    omit?: Prisma.QuestionSetOmit<ExtArgs> | null;
    include?: Prisma.QuestionSetInclude<ExtArgs> | null;
    where: Prisma.QuestionSetWhereUniqueInput;
};
export type QuestionSetFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSetSelect<ExtArgs> | null;
    omit?: Prisma.QuestionSetOmit<ExtArgs> | null;
    include?: Prisma.QuestionSetInclude<ExtArgs> | null;
    where: Prisma.QuestionSetWhereUniqueInput;
};
export type QuestionSetFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSetSelect<ExtArgs> | null;
    omit?: Prisma.QuestionSetOmit<ExtArgs> | null;
    include?: Prisma.QuestionSetInclude<ExtArgs> | null;
    where?: Prisma.QuestionSetWhereInput;
    orderBy?: Prisma.QuestionSetOrderByWithRelationInput | Prisma.QuestionSetOrderByWithRelationInput[];
    cursor?: Prisma.QuestionSetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionSetScalarFieldEnum | Prisma.QuestionSetScalarFieldEnum[];
};
export type QuestionSetFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSetSelect<ExtArgs> | null;
    omit?: Prisma.QuestionSetOmit<ExtArgs> | null;
    include?: Prisma.QuestionSetInclude<ExtArgs> | null;
    where?: Prisma.QuestionSetWhereInput;
    orderBy?: Prisma.QuestionSetOrderByWithRelationInput | Prisma.QuestionSetOrderByWithRelationInput[];
    cursor?: Prisma.QuestionSetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionSetScalarFieldEnum | Prisma.QuestionSetScalarFieldEnum[];
};
export type QuestionSetFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSetSelect<ExtArgs> | null;
    omit?: Prisma.QuestionSetOmit<ExtArgs> | null;
    include?: Prisma.QuestionSetInclude<ExtArgs> | null;
    where?: Prisma.QuestionSetWhereInput;
    orderBy?: Prisma.QuestionSetOrderByWithRelationInput | Prisma.QuestionSetOrderByWithRelationInput[];
    cursor?: Prisma.QuestionSetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.QuestionSetScalarFieldEnum | Prisma.QuestionSetScalarFieldEnum[];
};
export type QuestionSetCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSetSelect<ExtArgs> | null;
    omit?: Prisma.QuestionSetOmit<ExtArgs> | null;
    include?: Prisma.QuestionSetInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionSetCreateInput, Prisma.QuestionSetUncheckedCreateInput>;
};
export type QuestionSetCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.QuestionSetCreateManyInput | Prisma.QuestionSetCreateManyInput[];
    skipDuplicates?: boolean;
};
export type QuestionSetCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSetSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QuestionSetOmit<ExtArgs> | null;
    data: Prisma.QuestionSetCreateManyInput | Prisma.QuestionSetCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.QuestionSetIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type QuestionSetUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSetSelect<ExtArgs> | null;
    omit?: Prisma.QuestionSetOmit<ExtArgs> | null;
    include?: Prisma.QuestionSetInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionSetUpdateInput, Prisma.QuestionSetUncheckedUpdateInput>;
    where: Prisma.QuestionSetWhereUniqueInput;
};
export type QuestionSetUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.QuestionSetUpdateManyMutationInput, Prisma.QuestionSetUncheckedUpdateManyInput>;
    where?: Prisma.QuestionSetWhereInput;
    limit?: number;
};
export type QuestionSetUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSetSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.QuestionSetOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.QuestionSetUpdateManyMutationInput, Prisma.QuestionSetUncheckedUpdateManyInput>;
    where?: Prisma.QuestionSetWhereInput;
    limit?: number;
    include?: Prisma.QuestionSetIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type QuestionSetUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSetSelect<ExtArgs> | null;
    omit?: Prisma.QuestionSetOmit<ExtArgs> | null;
    include?: Prisma.QuestionSetInclude<ExtArgs> | null;
    where: Prisma.QuestionSetWhereUniqueInput;
    create: Prisma.XOR<Prisma.QuestionSetCreateInput, Prisma.QuestionSetUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.QuestionSetUpdateInput, Prisma.QuestionSetUncheckedUpdateInput>;
};
export type QuestionSetDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSetSelect<ExtArgs> | null;
    omit?: Prisma.QuestionSetOmit<ExtArgs> | null;
    include?: Prisma.QuestionSetInclude<ExtArgs> | null;
    where: Prisma.QuestionSetWhereUniqueInput;
};
export type QuestionSetDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QuestionSetWhereInput;
    limit?: number;
};
export type QuestionSetDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSetSelect<ExtArgs> | null;
    omit?: Prisma.QuestionSetOmit<ExtArgs> | null;
    include?: Prisma.QuestionSetInclude<ExtArgs> | null;
};
export {};
