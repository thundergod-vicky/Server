import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TestModel = runtime.Types.Result.DefaultSelection<Prisma.$TestPayload>;
export type AggregateTest = {
    _count: TestCountAggregateOutputType | null;
    _min: TestMinAggregateOutputType | null;
    _max: TestMaxAggregateOutputType | null;
};
export type TestMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    chapterId: string | null;
};
export type TestMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    chapterId: string | null;
};
export type TestCountAggregateOutputType = {
    id: number;
    title: number;
    questions: number;
    chapterId: number;
    _all: number;
};
export type TestMinAggregateInputType = {
    id?: true;
    title?: true;
    chapterId?: true;
};
export type TestMaxAggregateInputType = {
    id?: true;
    title?: true;
    chapterId?: true;
};
export type TestCountAggregateInputType = {
    id?: true;
    title?: true;
    questions?: true;
    chapterId?: true;
    _all?: true;
};
export type TestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TestWhereInput;
    orderBy?: Prisma.TestOrderByWithRelationInput | Prisma.TestOrderByWithRelationInput[];
    cursor?: Prisma.TestWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TestCountAggregateInputType;
    _min?: TestMinAggregateInputType;
    _max?: TestMaxAggregateInputType;
};
export type GetTestAggregateType<T extends TestAggregateArgs> = {
    [P in keyof T & keyof AggregateTest]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTest[P]> : Prisma.GetScalarType<T[P], AggregateTest[P]>;
};
export type TestGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TestWhereInput;
    orderBy?: Prisma.TestOrderByWithAggregationInput | Prisma.TestOrderByWithAggregationInput[];
    by: Prisma.TestScalarFieldEnum[] | Prisma.TestScalarFieldEnum;
    having?: Prisma.TestScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TestCountAggregateInputType | true;
    _min?: TestMinAggregateInputType;
    _max?: TestMaxAggregateInputType;
};
export type TestGroupByOutputType = {
    id: string;
    title: string;
    questions: runtime.JsonValue;
    chapterId: string;
    _count: TestCountAggregateOutputType | null;
    _min: TestMinAggregateOutputType | null;
    _max: TestMaxAggregateOutputType | null;
};
type GetTestGroupByPayload<T extends TestGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TestGroupByOutputType[P]>;
}>>;
export type TestWhereInput = {
    AND?: Prisma.TestWhereInput | Prisma.TestWhereInput[];
    OR?: Prisma.TestWhereInput[];
    NOT?: Prisma.TestWhereInput | Prisma.TestWhereInput[];
    id?: Prisma.StringFilter<"Test"> | string;
    title?: Prisma.StringFilter<"Test"> | string;
    questions?: Prisma.JsonFilter<"Test">;
    chapterId?: Prisma.StringFilter<"Test"> | string;
    chapter?: Prisma.XOR<Prisma.ChapterScalarRelationFilter, Prisma.ChapterWhereInput>;
    results?: Prisma.TestResultListRelationFilter;
};
export type TestOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    questions?: Prisma.SortOrder;
    chapterId?: Prisma.SortOrder;
    chapter?: Prisma.ChapterOrderByWithRelationInput;
    results?: Prisma.TestResultOrderByRelationAggregateInput;
};
export type TestWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TestWhereInput | Prisma.TestWhereInput[];
    OR?: Prisma.TestWhereInput[];
    NOT?: Prisma.TestWhereInput | Prisma.TestWhereInput[];
    title?: Prisma.StringFilter<"Test"> | string;
    questions?: Prisma.JsonFilter<"Test">;
    chapterId?: Prisma.StringFilter<"Test"> | string;
    chapter?: Prisma.XOR<Prisma.ChapterScalarRelationFilter, Prisma.ChapterWhereInput>;
    results?: Prisma.TestResultListRelationFilter;
}, "id">;
export type TestOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    questions?: Prisma.SortOrder;
    chapterId?: Prisma.SortOrder;
    _count?: Prisma.TestCountOrderByAggregateInput;
    _max?: Prisma.TestMaxOrderByAggregateInput;
    _min?: Prisma.TestMinOrderByAggregateInput;
};
export type TestScalarWhereWithAggregatesInput = {
    AND?: Prisma.TestScalarWhereWithAggregatesInput | Prisma.TestScalarWhereWithAggregatesInput[];
    OR?: Prisma.TestScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TestScalarWhereWithAggregatesInput | Prisma.TestScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Test"> | string;
    title?: Prisma.StringWithAggregatesFilter<"Test"> | string;
    questions?: Prisma.JsonWithAggregatesFilter<"Test">;
    chapterId?: Prisma.StringWithAggregatesFilter<"Test"> | string;
};
export type TestCreateInput = {
    id?: string;
    title: string;
    questions: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    chapter: Prisma.ChapterCreateNestedOneWithoutTestsInput;
    results?: Prisma.TestResultCreateNestedManyWithoutTestInput;
};
export type TestUncheckedCreateInput = {
    id?: string;
    title: string;
    questions: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    chapterId: string;
    results?: Prisma.TestResultUncheckedCreateNestedManyWithoutTestInput;
};
export type TestUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    chapter?: Prisma.ChapterUpdateOneRequiredWithoutTestsNestedInput;
    results?: Prisma.TestResultUpdateManyWithoutTestNestedInput;
};
export type TestUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    chapterId?: Prisma.StringFieldUpdateOperationsInput | string;
    results?: Prisma.TestResultUncheckedUpdateManyWithoutTestNestedInput;
};
export type TestCreateManyInput = {
    id?: string;
    title: string;
    questions: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    chapterId: string;
};
export type TestUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type TestUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    chapterId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type TestListRelationFilter = {
    every?: Prisma.TestWhereInput;
    some?: Prisma.TestWhereInput;
    none?: Prisma.TestWhereInput;
};
export type TestOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TestCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    questions?: Prisma.SortOrder;
    chapterId?: Prisma.SortOrder;
};
export type TestMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    chapterId?: Prisma.SortOrder;
};
export type TestMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    chapterId?: Prisma.SortOrder;
};
export type TestScalarRelationFilter = {
    is?: Prisma.TestWhereInput;
    isNot?: Prisma.TestWhereInput;
};
export type TestCreateNestedManyWithoutChapterInput = {
    create?: Prisma.XOR<Prisma.TestCreateWithoutChapterInput, Prisma.TestUncheckedCreateWithoutChapterInput> | Prisma.TestCreateWithoutChapterInput[] | Prisma.TestUncheckedCreateWithoutChapterInput[];
    connectOrCreate?: Prisma.TestCreateOrConnectWithoutChapterInput | Prisma.TestCreateOrConnectWithoutChapterInput[];
    createMany?: Prisma.TestCreateManyChapterInputEnvelope;
    connect?: Prisma.TestWhereUniqueInput | Prisma.TestWhereUniqueInput[];
};
export type TestUncheckedCreateNestedManyWithoutChapterInput = {
    create?: Prisma.XOR<Prisma.TestCreateWithoutChapterInput, Prisma.TestUncheckedCreateWithoutChapterInput> | Prisma.TestCreateWithoutChapterInput[] | Prisma.TestUncheckedCreateWithoutChapterInput[];
    connectOrCreate?: Prisma.TestCreateOrConnectWithoutChapterInput | Prisma.TestCreateOrConnectWithoutChapterInput[];
    createMany?: Prisma.TestCreateManyChapterInputEnvelope;
    connect?: Prisma.TestWhereUniqueInput | Prisma.TestWhereUniqueInput[];
};
export type TestUpdateManyWithoutChapterNestedInput = {
    create?: Prisma.XOR<Prisma.TestCreateWithoutChapterInput, Prisma.TestUncheckedCreateWithoutChapterInput> | Prisma.TestCreateWithoutChapterInput[] | Prisma.TestUncheckedCreateWithoutChapterInput[];
    connectOrCreate?: Prisma.TestCreateOrConnectWithoutChapterInput | Prisma.TestCreateOrConnectWithoutChapterInput[];
    upsert?: Prisma.TestUpsertWithWhereUniqueWithoutChapterInput | Prisma.TestUpsertWithWhereUniqueWithoutChapterInput[];
    createMany?: Prisma.TestCreateManyChapterInputEnvelope;
    set?: Prisma.TestWhereUniqueInput | Prisma.TestWhereUniqueInput[];
    disconnect?: Prisma.TestWhereUniqueInput | Prisma.TestWhereUniqueInput[];
    delete?: Prisma.TestWhereUniqueInput | Prisma.TestWhereUniqueInput[];
    connect?: Prisma.TestWhereUniqueInput | Prisma.TestWhereUniqueInput[];
    update?: Prisma.TestUpdateWithWhereUniqueWithoutChapterInput | Prisma.TestUpdateWithWhereUniqueWithoutChapterInput[];
    updateMany?: Prisma.TestUpdateManyWithWhereWithoutChapterInput | Prisma.TestUpdateManyWithWhereWithoutChapterInput[];
    deleteMany?: Prisma.TestScalarWhereInput | Prisma.TestScalarWhereInput[];
};
export type TestUncheckedUpdateManyWithoutChapterNestedInput = {
    create?: Prisma.XOR<Prisma.TestCreateWithoutChapterInput, Prisma.TestUncheckedCreateWithoutChapterInput> | Prisma.TestCreateWithoutChapterInput[] | Prisma.TestUncheckedCreateWithoutChapterInput[];
    connectOrCreate?: Prisma.TestCreateOrConnectWithoutChapterInput | Prisma.TestCreateOrConnectWithoutChapterInput[];
    upsert?: Prisma.TestUpsertWithWhereUniqueWithoutChapterInput | Prisma.TestUpsertWithWhereUniqueWithoutChapterInput[];
    createMany?: Prisma.TestCreateManyChapterInputEnvelope;
    set?: Prisma.TestWhereUniqueInput | Prisma.TestWhereUniqueInput[];
    disconnect?: Prisma.TestWhereUniqueInput | Prisma.TestWhereUniqueInput[];
    delete?: Prisma.TestWhereUniqueInput | Prisma.TestWhereUniqueInput[];
    connect?: Prisma.TestWhereUniqueInput | Prisma.TestWhereUniqueInput[];
    update?: Prisma.TestUpdateWithWhereUniqueWithoutChapterInput | Prisma.TestUpdateWithWhereUniqueWithoutChapterInput[];
    updateMany?: Prisma.TestUpdateManyWithWhereWithoutChapterInput | Prisma.TestUpdateManyWithWhereWithoutChapterInput[];
    deleteMany?: Prisma.TestScalarWhereInput | Prisma.TestScalarWhereInput[];
};
export type TestCreateNestedOneWithoutResultsInput = {
    create?: Prisma.XOR<Prisma.TestCreateWithoutResultsInput, Prisma.TestUncheckedCreateWithoutResultsInput>;
    connectOrCreate?: Prisma.TestCreateOrConnectWithoutResultsInput;
    connect?: Prisma.TestWhereUniqueInput;
};
export type TestUpdateOneRequiredWithoutResultsNestedInput = {
    create?: Prisma.XOR<Prisma.TestCreateWithoutResultsInput, Prisma.TestUncheckedCreateWithoutResultsInput>;
    connectOrCreate?: Prisma.TestCreateOrConnectWithoutResultsInput;
    upsert?: Prisma.TestUpsertWithoutResultsInput;
    connect?: Prisma.TestWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TestUpdateToOneWithWhereWithoutResultsInput, Prisma.TestUpdateWithoutResultsInput>, Prisma.TestUncheckedUpdateWithoutResultsInput>;
};
export type TestCreateWithoutChapterInput = {
    id?: string;
    title: string;
    questions: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    results?: Prisma.TestResultCreateNestedManyWithoutTestInput;
};
export type TestUncheckedCreateWithoutChapterInput = {
    id?: string;
    title: string;
    questions: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    results?: Prisma.TestResultUncheckedCreateNestedManyWithoutTestInput;
};
export type TestCreateOrConnectWithoutChapterInput = {
    where: Prisma.TestWhereUniqueInput;
    create: Prisma.XOR<Prisma.TestCreateWithoutChapterInput, Prisma.TestUncheckedCreateWithoutChapterInput>;
};
export type TestCreateManyChapterInputEnvelope = {
    data: Prisma.TestCreateManyChapterInput | Prisma.TestCreateManyChapterInput[];
    skipDuplicates?: boolean;
};
export type TestUpsertWithWhereUniqueWithoutChapterInput = {
    where: Prisma.TestWhereUniqueInput;
    update: Prisma.XOR<Prisma.TestUpdateWithoutChapterInput, Prisma.TestUncheckedUpdateWithoutChapterInput>;
    create: Prisma.XOR<Prisma.TestCreateWithoutChapterInput, Prisma.TestUncheckedCreateWithoutChapterInput>;
};
export type TestUpdateWithWhereUniqueWithoutChapterInput = {
    where: Prisma.TestWhereUniqueInput;
    data: Prisma.XOR<Prisma.TestUpdateWithoutChapterInput, Prisma.TestUncheckedUpdateWithoutChapterInput>;
};
export type TestUpdateManyWithWhereWithoutChapterInput = {
    where: Prisma.TestScalarWhereInput;
    data: Prisma.XOR<Prisma.TestUpdateManyMutationInput, Prisma.TestUncheckedUpdateManyWithoutChapterInput>;
};
export type TestScalarWhereInput = {
    AND?: Prisma.TestScalarWhereInput | Prisma.TestScalarWhereInput[];
    OR?: Prisma.TestScalarWhereInput[];
    NOT?: Prisma.TestScalarWhereInput | Prisma.TestScalarWhereInput[];
    id?: Prisma.StringFilter<"Test"> | string;
    title?: Prisma.StringFilter<"Test"> | string;
    questions?: Prisma.JsonFilter<"Test">;
    chapterId?: Prisma.StringFilter<"Test"> | string;
};
export type TestCreateWithoutResultsInput = {
    id?: string;
    title: string;
    questions: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    chapter: Prisma.ChapterCreateNestedOneWithoutTestsInput;
};
export type TestUncheckedCreateWithoutResultsInput = {
    id?: string;
    title: string;
    questions: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    chapterId: string;
};
export type TestCreateOrConnectWithoutResultsInput = {
    where: Prisma.TestWhereUniqueInput;
    create: Prisma.XOR<Prisma.TestCreateWithoutResultsInput, Prisma.TestUncheckedCreateWithoutResultsInput>;
};
export type TestUpsertWithoutResultsInput = {
    update: Prisma.XOR<Prisma.TestUpdateWithoutResultsInput, Prisma.TestUncheckedUpdateWithoutResultsInput>;
    create: Prisma.XOR<Prisma.TestCreateWithoutResultsInput, Prisma.TestUncheckedCreateWithoutResultsInput>;
    where?: Prisma.TestWhereInput;
};
export type TestUpdateToOneWithWhereWithoutResultsInput = {
    where?: Prisma.TestWhereInput;
    data: Prisma.XOR<Prisma.TestUpdateWithoutResultsInput, Prisma.TestUncheckedUpdateWithoutResultsInput>;
};
export type TestUpdateWithoutResultsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    chapter?: Prisma.ChapterUpdateOneRequiredWithoutTestsNestedInput;
};
export type TestUncheckedUpdateWithoutResultsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    chapterId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type TestCreateManyChapterInput = {
    id?: string;
    title: string;
    questions: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type TestUpdateWithoutChapterInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    results?: Prisma.TestResultUpdateManyWithoutTestNestedInput;
};
export type TestUncheckedUpdateWithoutChapterInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    results?: Prisma.TestResultUncheckedUpdateManyWithoutTestNestedInput;
};
export type TestUncheckedUpdateManyWithoutChapterInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    questions?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
};
export type TestCountOutputType = {
    results: number;
};
export type TestCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    results?: boolean | TestCountOutputTypeCountResultsArgs;
};
export type TestCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestCountOutputTypeSelect<ExtArgs> | null;
};
export type TestCountOutputTypeCountResultsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TestResultWhereInput;
};
export type TestSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    questions?: boolean;
    chapterId?: boolean;
    chapter?: boolean | Prisma.ChapterDefaultArgs<ExtArgs>;
    results?: boolean | Prisma.Test$resultsArgs<ExtArgs>;
    _count?: boolean | Prisma.TestCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["test"]>;
export type TestSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    questions?: boolean;
    chapterId?: boolean;
    chapter?: boolean | Prisma.ChapterDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["test"]>;
export type TestSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    questions?: boolean;
    chapterId?: boolean;
    chapter?: boolean | Prisma.ChapterDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["test"]>;
export type TestSelectScalar = {
    id?: boolean;
    title?: boolean;
    questions?: boolean;
    chapterId?: boolean;
};
export type TestOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "questions" | "chapterId", ExtArgs["result"]["test"]>;
export type TestInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    chapter?: boolean | Prisma.ChapterDefaultArgs<ExtArgs>;
    results?: boolean | Prisma.Test$resultsArgs<ExtArgs>;
    _count?: boolean | Prisma.TestCountOutputTypeDefaultArgs<ExtArgs>;
};
export type TestIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    chapter?: boolean | Prisma.ChapterDefaultArgs<ExtArgs>;
};
export type TestIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    chapter?: boolean | Prisma.ChapterDefaultArgs<ExtArgs>;
};
export type $TestPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Test";
    objects: {
        chapter: Prisma.$ChapterPayload<ExtArgs>;
        results: Prisma.$TestResultPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        title: string;
        questions: runtime.JsonValue;
        chapterId: string;
    }, ExtArgs["result"]["test"]>;
    composites: {};
};
export type TestGetPayload<S extends boolean | null | undefined | TestDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TestPayload, S>;
export type TestCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TestCountAggregateInputType | true;
};
export interface TestDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Test'];
        meta: {
            name: 'Test';
        };
    };
    findUnique<T extends TestFindUniqueArgs>(args: Prisma.SelectSubset<T, TestFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TestClient<runtime.Types.Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TestFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TestFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TestClient<runtime.Types.Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TestFindFirstArgs>(args?: Prisma.SelectSubset<T, TestFindFirstArgs<ExtArgs>>): Prisma.Prisma__TestClient<runtime.Types.Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TestFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TestFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TestClient<runtime.Types.Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TestFindManyArgs>(args?: Prisma.SelectSubset<T, TestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TestCreateArgs>(args: Prisma.SelectSubset<T, TestCreateArgs<ExtArgs>>): Prisma.Prisma__TestClient<runtime.Types.Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TestCreateManyArgs>(args?: Prisma.SelectSubset<T, TestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TestCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TestDeleteArgs>(args: Prisma.SelectSubset<T, TestDeleteArgs<ExtArgs>>): Prisma.Prisma__TestClient<runtime.Types.Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TestUpdateArgs>(args: Prisma.SelectSubset<T, TestUpdateArgs<ExtArgs>>): Prisma.Prisma__TestClient<runtime.Types.Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TestDeleteManyArgs>(args?: Prisma.SelectSubset<T, TestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TestUpdateManyArgs>(args: Prisma.SelectSubset<T, TestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TestUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TestUpsertArgs>(args: Prisma.SelectSubset<T, TestUpsertArgs<ExtArgs>>): Prisma.Prisma__TestClient<runtime.Types.Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TestCountArgs>(args?: Prisma.Subset<T, TestCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TestCountAggregateOutputType> : number>;
    aggregate<T extends TestAggregateArgs>(args: Prisma.Subset<T, TestAggregateArgs>): Prisma.PrismaPromise<GetTestAggregateType<T>>;
    groupBy<T extends TestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TestGroupByArgs['orderBy'];
    } : {
        orderBy?: TestGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TestFieldRefs;
}
export interface Prisma__TestClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    chapter<T extends Prisma.ChapterDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ChapterDefaultArgs<ExtArgs>>): Prisma.Prisma__ChapterClient<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    results<T extends Prisma.Test$resultsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Test$resultsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TestFieldRefs {
    readonly id: Prisma.FieldRef<"Test", 'String'>;
    readonly title: Prisma.FieldRef<"Test", 'String'>;
    readonly questions: Prisma.FieldRef<"Test", 'Json'>;
    readonly chapterId: Prisma.FieldRef<"Test", 'String'>;
}
export type TestFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestSelect<ExtArgs> | null;
    omit?: Prisma.TestOmit<ExtArgs> | null;
    include?: Prisma.TestInclude<ExtArgs> | null;
    where: Prisma.TestWhereUniqueInput;
};
export type TestFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestSelect<ExtArgs> | null;
    omit?: Prisma.TestOmit<ExtArgs> | null;
    include?: Prisma.TestInclude<ExtArgs> | null;
    where: Prisma.TestWhereUniqueInput;
};
export type TestFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestSelect<ExtArgs> | null;
    omit?: Prisma.TestOmit<ExtArgs> | null;
    include?: Prisma.TestInclude<ExtArgs> | null;
    where?: Prisma.TestWhereInput;
    orderBy?: Prisma.TestOrderByWithRelationInput | Prisma.TestOrderByWithRelationInput[];
    cursor?: Prisma.TestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TestScalarFieldEnum | Prisma.TestScalarFieldEnum[];
};
export type TestFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestSelect<ExtArgs> | null;
    omit?: Prisma.TestOmit<ExtArgs> | null;
    include?: Prisma.TestInclude<ExtArgs> | null;
    where?: Prisma.TestWhereInput;
    orderBy?: Prisma.TestOrderByWithRelationInput | Prisma.TestOrderByWithRelationInput[];
    cursor?: Prisma.TestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TestScalarFieldEnum | Prisma.TestScalarFieldEnum[];
};
export type TestFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestSelect<ExtArgs> | null;
    omit?: Prisma.TestOmit<ExtArgs> | null;
    include?: Prisma.TestInclude<ExtArgs> | null;
    where?: Prisma.TestWhereInput;
    orderBy?: Prisma.TestOrderByWithRelationInput | Prisma.TestOrderByWithRelationInput[];
    cursor?: Prisma.TestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TestScalarFieldEnum | Prisma.TestScalarFieldEnum[];
};
export type TestCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestSelect<ExtArgs> | null;
    omit?: Prisma.TestOmit<ExtArgs> | null;
    include?: Prisma.TestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TestCreateInput, Prisma.TestUncheckedCreateInput>;
};
export type TestCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TestCreateManyInput | Prisma.TestCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TestCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TestOmit<ExtArgs> | null;
    data: Prisma.TestCreateManyInput | Prisma.TestCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TestIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TestUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestSelect<ExtArgs> | null;
    omit?: Prisma.TestOmit<ExtArgs> | null;
    include?: Prisma.TestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TestUpdateInput, Prisma.TestUncheckedUpdateInput>;
    where: Prisma.TestWhereUniqueInput;
};
export type TestUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TestUpdateManyMutationInput, Prisma.TestUncheckedUpdateManyInput>;
    where?: Prisma.TestWhereInput;
    limit?: number;
};
export type TestUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TestOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TestUpdateManyMutationInput, Prisma.TestUncheckedUpdateManyInput>;
    where?: Prisma.TestWhereInput;
    limit?: number;
    include?: Prisma.TestIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TestUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestSelect<ExtArgs> | null;
    omit?: Prisma.TestOmit<ExtArgs> | null;
    include?: Prisma.TestInclude<ExtArgs> | null;
    where: Prisma.TestWhereUniqueInput;
    create: Prisma.XOR<Prisma.TestCreateInput, Prisma.TestUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TestUpdateInput, Prisma.TestUncheckedUpdateInput>;
};
export type TestDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestSelect<ExtArgs> | null;
    omit?: Prisma.TestOmit<ExtArgs> | null;
    include?: Prisma.TestInclude<ExtArgs> | null;
    where: Prisma.TestWhereUniqueInput;
};
export type TestDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TestWhereInput;
    limit?: number;
};
export type Test$resultsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestResultSelect<ExtArgs> | null;
    omit?: Prisma.TestResultOmit<ExtArgs> | null;
    include?: Prisma.TestResultInclude<ExtArgs> | null;
    where?: Prisma.TestResultWhereInput;
    orderBy?: Prisma.TestResultOrderByWithRelationInput | Prisma.TestResultOrderByWithRelationInput[];
    cursor?: Prisma.TestResultWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TestResultScalarFieldEnum | Prisma.TestResultScalarFieldEnum[];
};
export type TestDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestSelect<ExtArgs> | null;
    omit?: Prisma.TestOmit<ExtArgs> | null;
    include?: Prisma.TestInclude<ExtArgs> | null;
};
export {};
