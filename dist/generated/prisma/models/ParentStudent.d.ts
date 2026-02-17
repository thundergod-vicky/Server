import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ParentStudentModel = runtime.Types.Result.DefaultSelection<Prisma.$ParentStudentPayload>;
export type AggregateParentStudent = {
    _count: ParentStudentCountAggregateOutputType | null;
    _min: ParentStudentMinAggregateOutputType | null;
    _max: ParentStudentMaxAggregateOutputType | null;
};
export type ParentStudentMinAggregateOutputType = {
    id: string | null;
    parentId: string | null;
    studentId: string | null;
};
export type ParentStudentMaxAggregateOutputType = {
    id: string | null;
    parentId: string | null;
    studentId: string | null;
};
export type ParentStudentCountAggregateOutputType = {
    id: number;
    parentId: number;
    studentId: number;
    _all: number;
};
export type ParentStudentMinAggregateInputType = {
    id?: true;
    parentId?: true;
    studentId?: true;
};
export type ParentStudentMaxAggregateInputType = {
    id?: true;
    parentId?: true;
    studentId?: true;
};
export type ParentStudentCountAggregateInputType = {
    id?: true;
    parentId?: true;
    studentId?: true;
    _all?: true;
};
export type ParentStudentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ParentStudentWhereInput;
    orderBy?: Prisma.ParentStudentOrderByWithRelationInput | Prisma.ParentStudentOrderByWithRelationInput[];
    cursor?: Prisma.ParentStudentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ParentStudentCountAggregateInputType;
    _min?: ParentStudentMinAggregateInputType;
    _max?: ParentStudentMaxAggregateInputType;
};
export type GetParentStudentAggregateType<T extends ParentStudentAggregateArgs> = {
    [P in keyof T & keyof AggregateParentStudent]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateParentStudent[P]> : Prisma.GetScalarType<T[P], AggregateParentStudent[P]>;
};
export type ParentStudentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ParentStudentWhereInput;
    orderBy?: Prisma.ParentStudentOrderByWithAggregationInput | Prisma.ParentStudentOrderByWithAggregationInput[];
    by: Prisma.ParentStudentScalarFieldEnum[] | Prisma.ParentStudentScalarFieldEnum;
    having?: Prisma.ParentStudentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ParentStudentCountAggregateInputType | true;
    _min?: ParentStudentMinAggregateInputType;
    _max?: ParentStudentMaxAggregateInputType;
};
export type ParentStudentGroupByOutputType = {
    id: string;
    parentId: string;
    studentId: string;
    _count: ParentStudentCountAggregateOutputType | null;
    _min: ParentStudentMinAggregateOutputType | null;
    _max: ParentStudentMaxAggregateOutputType | null;
};
type GetParentStudentGroupByPayload<T extends ParentStudentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ParentStudentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ParentStudentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ParentStudentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ParentStudentGroupByOutputType[P]>;
}>>;
export type ParentStudentWhereInput = {
    AND?: Prisma.ParentStudentWhereInput | Prisma.ParentStudentWhereInput[];
    OR?: Prisma.ParentStudentWhereInput[];
    NOT?: Prisma.ParentStudentWhereInput | Prisma.ParentStudentWhereInput[];
    id?: Prisma.StringFilter<"ParentStudent"> | string;
    parentId?: Prisma.StringFilter<"ParentStudent"> | string;
    studentId?: Prisma.StringFilter<"ParentStudent"> | string;
    parent?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    student?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type ParentStudentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    studentId?: Prisma.SortOrder;
    parent?: Prisma.UserOrderByWithRelationInput;
    student?: Prisma.UserOrderByWithRelationInput;
};
export type ParentStudentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    parentId_studentId?: Prisma.ParentStudentParentIdStudentIdCompoundUniqueInput;
    AND?: Prisma.ParentStudentWhereInput | Prisma.ParentStudentWhereInput[];
    OR?: Prisma.ParentStudentWhereInput[];
    NOT?: Prisma.ParentStudentWhereInput | Prisma.ParentStudentWhereInput[];
    parentId?: Prisma.StringFilter<"ParentStudent"> | string;
    studentId?: Prisma.StringFilter<"ParentStudent"> | string;
    parent?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    student?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "parentId_studentId">;
export type ParentStudentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    studentId?: Prisma.SortOrder;
    _count?: Prisma.ParentStudentCountOrderByAggregateInput;
    _max?: Prisma.ParentStudentMaxOrderByAggregateInput;
    _min?: Prisma.ParentStudentMinOrderByAggregateInput;
};
export type ParentStudentScalarWhereWithAggregatesInput = {
    AND?: Prisma.ParentStudentScalarWhereWithAggregatesInput | Prisma.ParentStudentScalarWhereWithAggregatesInput[];
    OR?: Prisma.ParentStudentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ParentStudentScalarWhereWithAggregatesInput | Prisma.ParentStudentScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ParentStudent"> | string;
    parentId?: Prisma.StringWithAggregatesFilter<"ParentStudent"> | string;
    studentId?: Prisma.StringWithAggregatesFilter<"ParentStudent"> | string;
};
export type ParentStudentCreateInput = {
    id?: string;
    parent: Prisma.UserCreateNestedOneWithoutParentOfInput;
    student: Prisma.UserCreateNestedOneWithoutStudentOfInput;
};
export type ParentStudentUncheckedCreateInput = {
    id?: string;
    parentId: string;
    studentId: string;
};
export type ParentStudentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    parent?: Prisma.UserUpdateOneRequiredWithoutParentOfNestedInput;
    student?: Prisma.UserUpdateOneRequiredWithoutStudentOfNestedInput;
};
export type ParentStudentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.StringFieldUpdateOperationsInput | string;
    studentId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ParentStudentCreateManyInput = {
    id?: string;
    parentId: string;
    studentId: string;
};
export type ParentStudentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ParentStudentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.StringFieldUpdateOperationsInput | string;
    studentId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ParentStudentListRelationFilter = {
    every?: Prisma.ParentStudentWhereInput;
    some?: Prisma.ParentStudentWhereInput;
    none?: Prisma.ParentStudentWhereInput;
};
export type ParentStudentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ParentStudentParentIdStudentIdCompoundUniqueInput = {
    parentId: string;
    studentId: string;
};
export type ParentStudentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    studentId?: Prisma.SortOrder;
};
export type ParentStudentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    studentId?: Prisma.SortOrder;
};
export type ParentStudentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    studentId?: Prisma.SortOrder;
};
export type ParentStudentCreateNestedManyWithoutParentInput = {
    create?: Prisma.XOR<Prisma.ParentStudentCreateWithoutParentInput, Prisma.ParentStudentUncheckedCreateWithoutParentInput> | Prisma.ParentStudentCreateWithoutParentInput[] | Prisma.ParentStudentUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.ParentStudentCreateOrConnectWithoutParentInput | Prisma.ParentStudentCreateOrConnectWithoutParentInput[];
    createMany?: Prisma.ParentStudentCreateManyParentInputEnvelope;
    connect?: Prisma.ParentStudentWhereUniqueInput | Prisma.ParentStudentWhereUniqueInput[];
};
export type ParentStudentCreateNestedManyWithoutStudentInput = {
    create?: Prisma.XOR<Prisma.ParentStudentCreateWithoutStudentInput, Prisma.ParentStudentUncheckedCreateWithoutStudentInput> | Prisma.ParentStudentCreateWithoutStudentInput[] | Prisma.ParentStudentUncheckedCreateWithoutStudentInput[];
    connectOrCreate?: Prisma.ParentStudentCreateOrConnectWithoutStudentInput | Prisma.ParentStudentCreateOrConnectWithoutStudentInput[];
    createMany?: Prisma.ParentStudentCreateManyStudentInputEnvelope;
    connect?: Prisma.ParentStudentWhereUniqueInput | Prisma.ParentStudentWhereUniqueInput[];
};
export type ParentStudentUncheckedCreateNestedManyWithoutParentInput = {
    create?: Prisma.XOR<Prisma.ParentStudentCreateWithoutParentInput, Prisma.ParentStudentUncheckedCreateWithoutParentInput> | Prisma.ParentStudentCreateWithoutParentInput[] | Prisma.ParentStudentUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.ParentStudentCreateOrConnectWithoutParentInput | Prisma.ParentStudentCreateOrConnectWithoutParentInput[];
    createMany?: Prisma.ParentStudentCreateManyParentInputEnvelope;
    connect?: Prisma.ParentStudentWhereUniqueInput | Prisma.ParentStudentWhereUniqueInput[];
};
export type ParentStudentUncheckedCreateNestedManyWithoutStudentInput = {
    create?: Prisma.XOR<Prisma.ParentStudentCreateWithoutStudentInput, Prisma.ParentStudentUncheckedCreateWithoutStudentInput> | Prisma.ParentStudentCreateWithoutStudentInput[] | Prisma.ParentStudentUncheckedCreateWithoutStudentInput[];
    connectOrCreate?: Prisma.ParentStudentCreateOrConnectWithoutStudentInput | Prisma.ParentStudentCreateOrConnectWithoutStudentInput[];
    createMany?: Prisma.ParentStudentCreateManyStudentInputEnvelope;
    connect?: Prisma.ParentStudentWhereUniqueInput | Prisma.ParentStudentWhereUniqueInput[];
};
export type ParentStudentUpdateManyWithoutParentNestedInput = {
    create?: Prisma.XOR<Prisma.ParentStudentCreateWithoutParentInput, Prisma.ParentStudentUncheckedCreateWithoutParentInput> | Prisma.ParentStudentCreateWithoutParentInput[] | Prisma.ParentStudentUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.ParentStudentCreateOrConnectWithoutParentInput | Prisma.ParentStudentCreateOrConnectWithoutParentInput[];
    upsert?: Prisma.ParentStudentUpsertWithWhereUniqueWithoutParentInput | Prisma.ParentStudentUpsertWithWhereUniqueWithoutParentInput[];
    createMany?: Prisma.ParentStudentCreateManyParentInputEnvelope;
    set?: Prisma.ParentStudentWhereUniqueInput | Prisma.ParentStudentWhereUniqueInput[];
    disconnect?: Prisma.ParentStudentWhereUniqueInput | Prisma.ParentStudentWhereUniqueInput[];
    delete?: Prisma.ParentStudentWhereUniqueInput | Prisma.ParentStudentWhereUniqueInput[];
    connect?: Prisma.ParentStudentWhereUniqueInput | Prisma.ParentStudentWhereUniqueInput[];
    update?: Prisma.ParentStudentUpdateWithWhereUniqueWithoutParentInput | Prisma.ParentStudentUpdateWithWhereUniqueWithoutParentInput[];
    updateMany?: Prisma.ParentStudentUpdateManyWithWhereWithoutParentInput | Prisma.ParentStudentUpdateManyWithWhereWithoutParentInput[];
    deleteMany?: Prisma.ParentStudentScalarWhereInput | Prisma.ParentStudentScalarWhereInput[];
};
export type ParentStudentUpdateManyWithoutStudentNestedInput = {
    create?: Prisma.XOR<Prisma.ParentStudentCreateWithoutStudentInput, Prisma.ParentStudentUncheckedCreateWithoutStudentInput> | Prisma.ParentStudentCreateWithoutStudentInput[] | Prisma.ParentStudentUncheckedCreateWithoutStudentInput[];
    connectOrCreate?: Prisma.ParentStudentCreateOrConnectWithoutStudentInput | Prisma.ParentStudentCreateOrConnectWithoutStudentInput[];
    upsert?: Prisma.ParentStudentUpsertWithWhereUniqueWithoutStudentInput | Prisma.ParentStudentUpsertWithWhereUniqueWithoutStudentInput[];
    createMany?: Prisma.ParentStudentCreateManyStudentInputEnvelope;
    set?: Prisma.ParentStudentWhereUniqueInput | Prisma.ParentStudentWhereUniqueInput[];
    disconnect?: Prisma.ParentStudentWhereUniqueInput | Prisma.ParentStudentWhereUniqueInput[];
    delete?: Prisma.ParentStudentWhereUniqueInput | Prisma.ParentStudentWhereUniqueInput[];
    connect?: Prisma.ParentStudentWhereUniqueInput | Prisma.ParentStudentWhereUniqueInput[];
    update?: Prisma.ParentStudentUpdateWithWhereUniqueWithoutStudentInput | Prisma.ParentStudentUpdateWithWhereUniqueWithoutStudentInput[];
    updateMany?: Prisma.ParentStudentUpdateManyWithWhereWithoutStudentInput | Prisma.ParentStudentUpdateManyWithWhereWithoutStudentInput[];
    deleteMany?: Prisma.ParentStudentScalarWhereInput | Prisma.ParentStudentScalarWhereInput[];
};
export type ParentStudentUncheckedUpdateManyWithoutParentNestedInput = {
    create?: Prisma.XOR<Prisma.ParentStudentCreateWithoutParentInput, Prisma.ParentStudentUncheckedCreateWithoutParentInput> | Prisma.ParentStudentCreateWithoutParentInput[] | Prisma.ParentStudentUncheckedCreateWithoutParentInput[];
    connectOrCreate?: Prisma.ParentStudentCreateOrConnectWithoutParentInput | Prisma.ParentStudentCreateOrConnectWithoutParentInput[];
    upsert?: Prisma.ParentStudentUpsertWithWhereUniqueWithoutParentInput | Prisma.ParentStudentUpsertWithWhereUniqueWithoutParentInput[];
    createMany?: Prisma.ParentStudentCreateManyParentInputEnvelope;
    set?: Prisma.ParentStudentWhereUniqueInput | Prisma.ParentStudentWhereUniqueInput[];
    disconnect?: Prisma.ParentStudentWhereUniqueInput | Prisma.ParentStudentWhereUniqueInput[];
    delete?: Prisma.ParentStudentWhereUniqueInput | Prisma.ParentStudentWhereUniqueInput[];
    connect?: Prisma.ParentStudentWhereUniqueInput | Prisma.ParentStudentWhereUniqueInput[];
    update?: Prisma.ParentStudentUpdateWithWhereUniqueWithoutParentInput | Prisma.ParentStudentUpdateWithWhereUniqueWithoutParentInput[];
    updateMany?: Prisma.ParentStudentUpdateManyWithWhereWithoutParentInput | Prisma.ParentStudentUpdateManyWithWhereWithoutParentInput[];
    deleteMany?: Prisma.ParentStudentScalarWhereInput | Prisma.ParentStudentScalarWhereInput[];
};
export type ParentStudentUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: Prisma.XOR<Prisma.ParentStudentCreateWithoutStudentInput, Prisma.ParentStudentUncheckedCreateWithoutStudentInput> | Prisma.ParentStudentCreateWithoutStudentInput[] | Prisma.ParentStudentUncheckedCreateWithoutStudentInput[];
    connectOrCreate?: Prisma.ParentStudentCreateOrConnectWithoutStudentInput | Prisma.ParentStudentCreateOrConnectWithoutStudentInput[];
    upsert?: Prisma.ParentStudentUpsertWithWhereUniqueWithoutStudentInput | Prisma.ParentStudentUpsertWithWhereUniqueWithoutStudentInput[];
    createMany?: Prisma.ParentStudentCreateManyStudentInputEnvelope;
    set?: Prisma.ParentStudentWhereUniqueInput | Prisma.ParentStudentWhereUniqueInput[];
    disconnect?: Prisma.ParentStudentWhereUniqueInput | Prisma.ParentStudentWhereUniqueInput[];
    delete?: Prisma.ParentStudentWhereUniqueInput | Prisma.ParentStudentWhereUniqueInput[];
    connect?: Prisma.ParentStudentWhereUniqueInput | Prisma.ParentStudentWhereUniqueInput[];
    update?: Prisma.ParentStudentUpdateWithWhereUniqueWithoutStudentInput | Prisma.ParentStudentUpdateWithWhereUniqueWithoutStudentInput[];
    updateMany?: Prisma.ParentStudentUpdateManyWithWhereWithoutStudentInput | Prisma.ParentStudentUpdateManyWithWhereWithoutStudentInput[];
    deleteMany?: Prisma.ParentStudentScalarWhereInput | Prisma.ParentStudentScalarWhereInput[];
};
export type ParentStudentCreateWithoutParentInput = {
    id?: string;
    student: Prisma.UserCreateNestedOneWithoutStudentOfInput;
};
export type ParentStudentUncheckedCreateWithoutParentInput = {
    id?: string;
    studentId: string;
};
export type ParentStudentCreateOrConnectWithoutParentInput = {
    where: Prisma.ParentStudentWhereUniqueInput;
    create: Prisma.XOR<Prisma.ParentStudentCreateWithoutParentInput, Prisma.ParentStudentUncheckedCreateWithoutParentInput>;
};
export type ParentStudentCreateManyParentInputEnvelope = {
    data: Prisma.ParentStudentCreateManyParentInput | Prisma.ParentStudentCreateManyParentInput[];
    skipDuplicates?: boolean;
};
export type ParentStudentCreateWithoutStudentInput = {
    id?: string;
    parent: Prisma.UserCreateNestedOneWithoutParentOfInput;
};
export type ParentStudentUncheckedCreateWithoutStudentInput = {
    id?: string;
    parentId: string;
};
export type ParentStudentCreateOrConnectWithoutStudentInput = {
    where: Prisma.ParentStudentWhereUniqueInput;
    create: Prisma.XOR<Prisma.ParentStudentCreateWithoutStudentInput, Prisma.ParentStudentUncheckedCreateWithoutStudentInput>;
};
export type ParentStudentCreateManyStudentInputEnvelope = {
    data: Prisma.ParentStudentCreateManyStudentInput | Prisma.ParentStudentCreateManyStudentInput[];
    skipDuplicates?: boolean;
};
export type ParentStudentUpsertWithWhereUniqueWithoutParentInput = {
    where: Prisma.ParentStudentWhereUniqueInput;
    update: Prisma.XOR<Prisma.ParentStudentUpdateWithoutParentInput, Prisma.ParentStudentUncheckedUpdateWithoutParentInput>;
    create: Prisma.XOR<Prisma.ParentStudentCreateWithoutParentInput, Prisma.ParentStudentUncheckedCreateWithoutParentInput>;
};
export type ParentStudentUpdateWithWhereUniqueWithoutParentInput = {
    where: Prisma.ParentStudentWhereUniqueInput;
    data: Prisma.XOR<Prisma.ParentStudentUpdateWithoutParentInput, Prisma.ParentStudentUncheckedUpdateWithoutParentInput>;
};
export type ParentStudentUpdateManyWithWhereWithoutParentInput = {
    where: Prisma.ParentStudentScalarWhereInput;
    data: Prisma.XOR<Prisma.ParentStudentUpdateManyMutationInput, Prisma.ParentStudentUncheckedUpdateManyWithoutParentInput>;
};
export type ParentStudentScalarWhereInput = {
    AND?: Prisma.ParentStudentScalarWhereInput | Prisma.ParentStudentScalarWhereInput[];
    OR?: Prisma.ParentStudentScalarWhereInput[];
    NOT?: Prisma.ParentStudentScalarWhereInput | Prisma.ParentStudentScalarWhereInput[];
    id?: Prisma.StringFilter<"ParentStudent"> | string;
    parentId?: Prisma.StringFilter<"ParentStudent"> | string;
    studentId?: Prisma.StringFilter<"ParentStudent"> | string;
};
export type ParentStudentUpsertWithWhereUniqueWithoutStudentInput = {
    where: Prisma.ParentStudentWhereUniqueInput;
    update: Prisma.XOR<Prisma.ParentStudentUpdateWithoutStudentInput, Prisma.ParentStudentUncheckedUpdateWithoutStudentInput>;
    create: Prisma.XOR<Prisma.ParentStudentCreateWithoutStudentInput, Prisma.ParentStudentUncheckedCreateWithoutStudentInput>;
};
export type ParentStudentUpdateWithWhereUniqueWithoutStudentInput = {
    where: Prisma.ParentStudentWhereUniqueInput;
    data: Prisma.XOR<Prisma.ParentStudentUpdateWithoutStudentInput, Prisma.ParentStudentUncheckedUpdateWithoutStudentInput>;
};
export type ParentStudentUpdateManyWithWhereWithoutStudentInput = {
    where: Prisma.ParentStudentScalarWhereInput;
    data: Prisma.XOR<Prisma.ParentStudentUpdateManyMutationInput, Prisma.ParentStudentUncheckedUpdateManyWithoutStudentInput>;
};
export type ParentStudentCreateManyParentInput = {
    id?: string;
    studentId: string;
};
export type ParentStudentCreateManyStudentInput = {
    id?: string;
    parentId: string;
};
export type ParentStudentUpdateWithoutParentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    student?: Prisma.UserUpdateOneRequiredWithoutStudentOfNestedInput;
};
export type ParentStudentUncheckedUpdateWithoutParentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    studentId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ParentStudentUncheckedUpdateManyWithoutParentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    studentId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ParentStudentUpdateWithoutStudentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    parent?: Prisma.UserUpdateOneRequiredWithoutParentOfNestedInput;
};
export type ParentStudentUncheckedUpdateWithoutStudentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ParentStudentUncheckedUpdateManyWithoutStudentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ParentStudentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    parentId?: boolean;
    studentId?: boolean;
    parent?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    student?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["parentStudent"]>;
export type ParentStudentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    parentId?: boolean;
    studentId?: boolean;
    parent?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    student?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["parentStudent"]>;
export type ParentStudentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    parentId?: boolean;
    studentId?: boolean;
    parent?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    student?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["parentStudent"]>;
export type ParentStudentSelectScalar = {
    id?: boolean;
    parentId?: boolean;
    studentId?: boolean;
};
export type ParentStudentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "parentId" | "studentId", ExtArgs["result"]["parentStudent"]>;
export type ParentStudentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    parent?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    student?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ParentStudentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    parent?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    student?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ParentStudentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    parent?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    student?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ParentStudentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ParentStudent";
    objects: {
        parent: Prisma.$UserPayload<ExtArgs>;
        student: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        parentId: string;
        studentId: string;
    }, ExtArgs["result"]["parentStudent"]>;
    composites: {};
};
export type ParentStudentGetPayload<S extends boolean | null | undefined | ParentStudentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ParentStudentPayload, S>;
export type ParentStudentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ParentStudentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ParentStudentCountAggregateInputType | true;
};
export interface ParentStudentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ParentStudent'];
        meta: {
            name: 'ParentStudent';
        };
    };
    findUnique<T extends ParentStudentFindUniqueArgs>(args: Prisma.SelectSubset<T, ParentStudentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ParentStudentClient<runtime.Types.Result.GetResult<Prisma.$ParentStudentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ParentStudentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ParentStudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ParentStudentClient<runtime.Types.Result.GetResult<Prisma.$ParentStudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ParentStudentFindFirstArgs>(args?: Prisma.SelectSubset<T, ParentStudentFindFirstArgs<ExtArgs>>): Prisma.Prisma__ParentStudentClient<runtime.Types.Result.GetResult<Prisma.$ParentStudentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ParentStudentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ParentStudentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ParentStudentClient<runtime.Types.Result.GetResult<Prisma.$ParentStudentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ParentStudentFindManyArgs>(args?: Prisma.SelectSubset<T, ParentStudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParentStudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ParentStudentCreateArgs>(args: Prisma.SelectSubset<T, ParentStudentCreateArgs<ExtArgs>>): Prisma.Prisma__ParentStudentClient<runtime.Types.Result.GetResult<Prisma.$ParentStudentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ParentStudentCreateManyArgs>(args?: Prisma.SelectSubset<T, ParentStudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ParentStudentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ParentStudentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParentStudentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ParentStudentDeleteArgs>(args: Prisma.SelectSubset<T, ParentStudentDeleteArgs<ExtArgs>>): Prisma.Prisma__ParentStudentClient<runtime.Types.Result.GetResult<Prisma.$ParentStudentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ParentStudentUpdateArgs>(args: Prisma.SelectSubset<T, ParentStudentUpdateArgs<ExtArgs>>): Prisma.Prisma__ParentStudentClient<runtime.Types.Result.GetResult<Prisma.$ParentStudentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ParentStudentDeleteManyArgs>(args?: Prisma.SelectSubset<T, ParentStudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ParentStudentUpdateManyArgs>(args: Prisma.SelectSubset<T, ParentStudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ParentStudentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ParentStudentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParentStudentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ParentStudentUpsertArgs>(args: Prisma.SelectSubset<T, ParentStudentUpsertArgs<ExtArgs>>): Prisma.Prisma__ParentStudentClient<runtime.Types.Result.GetResult<Prisma.$ParentStudentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ParentStudentCountArgs>(args?: Prisma.Subset<T, ParentStudentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ParentStudentCountAggregateOutputType> : number>;
    aggregate<T extends ParentStudentAggregateArgs>(args: Prisma.Subset<T, ParentStudentAggregateArgs>): Prisma.PrismaPromise<GetParentStudentAggregateType<T>>;
    groupBy<T extends ParentStudentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ParentStudentGroupByArgs['orderBy'];
    } : {
        orderBy?: ParentStudentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ParentStudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParentStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ParentStudentFieldRefs;
}
export interface Prisma__ParentStudentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    parent<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    student<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ParentStudentFieldRefs {
    readonly id: Prisma.FieldRef<"ParentStudent", 'String'>;
    readonly parentId: Prisma.FieldRef<"ParentStudent", 'String'>;
    readonly studentId: Prisma.FieldRef<"ParentStudent", 'String'>;
}
export type ParentStudentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParentStudentSelect<ExtArgs> | null;
    omit?: Prisma.ParentStudentOmit<ExtArgs> | null;
    include?: Prisma.ParentStudentInclude<ExtArgs> | null;
    where: Prisma.ParentStudentWhereUniqueInput;
};
export type ParentStudentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParentStudentSelect<ExtArgs> | null;
    omit?: Prisma.ParentStudentOmit<ExtArgs> | null;
    include?: Prisma.ParentStudentInclude<ExtArgs> | null;
    where: Prisma.ParentStudentWhereUniqueInput;
};
export type ParentStudentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParentStudentSelect<ExtArgs> | null;
    omit?: Prisma.ParentStudentOmit<ExtArgs> | null;
    include?: Prisma.ParentStudentInclude<ExtArgs> | null;
    where?: Prisma.ParentStudentWhereInput;
    orderBy?: Prisma.ParentStudentOrderByWithRelationInput | Prisma.ParentStudentOrderByWithRelationInput[];
    cursor?: Prisma.ParentStudentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ParentStudentScalarFieldEnum | Prisma.ParentStudentScalarFieldEnum[];
};
export type ParentStudentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParentStudentSelect<ExtArgs> | null;
    omit?: Prisma.ParentStudentOmit<ExtArgs> | null;
    include?: Prisma.ParentStudentInclude<ExtArgs> | null;
    where?: Prisma.ParentStudentWhereInput;
    orderBy?: Prisma.ParentStudentOrderByWithRelationInput | Prisma.ParentStudentOrderByWithRelationInput[];
    cursor?: Prisma.ParentStudentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ParentStudentScalarFieldEnum | Prisma.ParentStudentScalarFieldEnum[];
};
export type ParentStudentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParentStudentSelect<ExtArgs> | null;
    omit?: Prisma.ParentStudentOmit<ExtArgs> | null;
    include?: Prisma.ParentStudentInclude<ExtArgs> | null;
    where?: Prisma.ParentStudentWhereInput;
    orderBy?: Prisma.ParentStudentOrderByWithRelationInput | Prisma.ParentStudentOrderByWithRelationInput[];
    cursor?: Prisma.ParentStudentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ParentStudentScalarFieldEnum | Prisma.ParentStudentScalarFieldEnum[];
};
export type ParentStudentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParentStudentSelect<ExtArgs> | null;
    omit?: Prisma.ParentStudentOmit<ExtArgs> | null;
    include?: Prisma.ParentStudentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ParentStudentCreateInput, Prisma.ParentStudentUncheckedCreateInput>;
};
export type ParentStudentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ParentStudentCreateManyInput | Prisma.ParentStudentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ParentStudentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParentStudentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ParentStudentOmit<ExtArgs> | null;
    data: Prisma.ParentStudentCreateManyInput | Prisma.ParentStudentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ParentStudentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ParentStudentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParentStudentSelect<ExtArgs> | null;
    omit?: Prisma.ParentStudentOmit<ExtArgs> | null;
    include?: Prisma.ParentStudentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ParentStudentUpdateInput, Prisma.ParentStudentUncheckedUpdateInput>;
    where: Prisma.ParentStudentWhereUniqueInput;
};
export type ParentStudentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ParentStudentUpdateManyMutationInput, Prisma.ParentStudentUncheckedUpdateManyInput>;
    where?: Prisma.ParentStudentWhereInput;
    limit?: number;
};
export type ParentStudentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParentStudentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ParentStudentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ParentStudentUpdateManyMutationInput, Prisma.ParentStudentUncheckedUpdateManyInput>;
    where?: Prisma.ParentStudentWhereInput;
    limit?: number;
    include?: Prisma.ParentStudentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ParentStudentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParentStudentSelect<ExtArgs> | null;
    omit?: Prisma.ParentStudentOmit<ExtArgs> | null;
    include?: Prisma.ParentStudentInclude<ExtArgs> | null;
    where: Prisma.ParentStudentWhereUniqueInput;
    create: Prisma.XOR<Prisma.ParentStudentCreateInput, Prisma.ParentStudentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ParentStudentUpdateInput, Prisma.ParentStudentUncheckedUpdateInput>;
};
export type ParentStudentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParentStudentSelect<ExtArgs> | null;
    omit?: Prisma.ParentStudentOmit<ExtArgs> | null;
    include?: Prisma.ParentStudentInclude<ExtArgs> | null;
    where: Prisma.ParentStudentWhereUniqueInput;
};
export type ParentStudentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ParentStudentWhereInput;
    limit?: number;
};
export type ParentStudentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParentStudentSelect<ExtArgs> | null;
    omit?: Prisma.ParentStudentOmit<ExtArgs> | null;
    include?: Prisma.ParentStudentInclude<ExtArgs> | null;
};
export {};
