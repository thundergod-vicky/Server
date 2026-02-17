import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TestResultModel = runtime.Types.Result.DefaultSelection<Prisma.$TestResultPayload>;
export type AggregateTestResult = {
    _count: TestResultCountAggregateOutputType | null;
    _avg: TestResultAvgAggregateOutputType | null;
    _sum: TestResultSumAggregateOutputType | null;
    _min: TestResultMinAggregateOutputType | null;
    _max: TestResultMaxAggregateOutputType | null;
};
export type TestResultAvgAggregateOutputType = {
    score: number | null;
    rank: number | null;
};
export type TestResultSumAggregateOutputType = {
    score: number | null;
    rank: number | null;
};
export type TestResultMinAggregateOutputType = {
    id: string | null;
    studentId: string | null;
    testId: string | null;
    score: number | null;
    rank: number | null;
    createdAt: Date | null;
};
export type TestResultMaxAggregateOutputType = {
    id: string | null;
    studentId: string | null;
    testId: string | null;
    score: number | null;
    rank: number | null;
    createdAt: Date | null;
};
export type TestResultCountAggregateOutputType = {
    id: number;
    studentId: number;
    testId: number;
    score: number;
    rank: number;
    createdAt: number;
    _all: number;
};
export type TestResultAvgAggregateInputType = {
    score?: true;
    rank?: true;
};
export type TestResultSumAggregateInputType = {
    score?: true;
    rank?: true;
};
export type TestResultMinAggregateInputType = {
    id?: true;
    studentId?: true;
    testId?: true;
    score?: true;
    rank?: true;
    createdAt?: true;
};
export type TestResultMaxAggregateInputType = {
    id?: true;
    studentId?: true;
    testId?: true;
    score?: true;
    rank?: true;
    createdAt?: true;
};
export type TestResultCountAggregateInputType = {
    id?: true;
    studentId?: true;
    testId?: true;
    score?: true;
    rank?: true;
    createdAt?: true;
    _all?: true;
};
export type TestResultAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TestResultWhereInput;
    orderBy?: Prisma.TestResultOrderByWithRelationInput | Prisma.TestResultOrderByWithRelationInput[];
    cursor?: Prisma.TestResultWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TestResultCountAggregateInputType;
    _avg?: TestResultAvgAggregateInputType;
    _sum?: TestResultSumAggregateInputType;
    _min?: TestResultMinAggregateInputType;
    _max?: TestResultMaxAggregateInputType;
};
export type GetTestResultAggregateType<T extends TestResultAggregateArgs> = {
    [P in keyof T & keyof AggregateTestResult]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTestResult[P]> : Prisma.GetScalarType<T[P], AggregateTestResult[P]>;
};
export type TestResultGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TestResultWhereInput;
    orderBy?: Prisma.TestResultOrderByWithAggregationInput | Prisma.TestResultOrderByWithAggregationInput[];
    by: Prisma.TestResultScalarFieldEnum[] | Prisma.TestResultScalarFieldEnum;
    having?: Prisma.TestResultScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TestResultCountAggregateInputType | true;
    _avg?: TestResultAvgAggregateInputType;
    _sum?: TestResultSumAggregateInputType;
    _min?: TestResultMinAggregateInputType;
    _max?: TestResultMaxAggregateInputType;
};
export type TestResultGroupByOutputType = {
    id: string;
    studentId: string;
    testId: string;
    score: number;
    rank: number | null;
    createdAt: Date;
    _count: TestResultCountAggregateOutputType | null;
    _avg: TestResultAvgAggregateOutputType | null;
    _sum: TestResultSumAggregateOutputType | null;
    _min: TestResultMinAggregateOutputType | null;
    _max: TestResultMaxAggregateOutputType | null;
};
type GetTestResultGroupByPayload<T extends TestResultGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TestResultGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TestResultGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TestResultGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TestResultGroupByOutputType[P]>;
}>>;
export type TestResultWhereInput = {
    AND?: Prisma.TestResultWhereInput | Prisma.TestResultWhereInput[];
    OR?: Prisma.TestResultWhereInput[];
    NOT?: Prisma.TestResultWhereInput | Prisma.TestResultWhereInput[];
    id?: Prisma.StringFilter<"TestResult"> | string;
    studentId?: Prisma.StringFilter<"TestResult"> | string;
    testId?: Prisma.StringFilter<"TestResult"> | string;
    score?: Prisma.IntFilter<"TestResult"> | number;
    rank?: Prisma.IntNullableFilter<"TestResult"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"TestResult"> | Date | string;
    student?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    test?: Prisma.XOR<Prisma.TestScalarRelationFilter, Prisma.TestWhereInput>;
};
export type TestResultOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    studentId?: Prisma.SortOrder;
    testId?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    rank?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    student?: Prisma.UserOrderByWithRelationInput;
    test?: Prisma.TestOrderByWithRelationInput;
};
export type TestResultWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TestResultWhereInput | Prisma.TestResultWhereInput[];
    OR?: Prisma.TestResultWhereInput[];
    NOT?: Prisma.TestResultWhereInput | Prisma.TestResultWhereInput[];
    studentId?: Prisma.StringFilter<"TestResult"> | string;
    testId?: Prisma.StringFilter<"TestResult"> | string;
    score?: Prisma.IntFilter<"TestResult"> | number;
    rank?: Prisma.IntNullableFilter<"TestResult"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"TestResult"> | Date | string;
    student?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    test?: Prisma.XOR<Prisma.TestScalarRelationFilter, Prisma.TestWhereInput>;
}, "id">;
export type TestResultOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    studentId?: Prisma.SortOrder;
    testId?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    rank?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.TestResultCountOrderByAggregateInput;
    _avg?: Prisma.TestResultAvgOrderByAggregateInput;
    _max?: Prisma.TestResultMaxOrderByAggregateInput;
    _min?: Prisma.TestResultMinOrderByAggregateInput;
    _sum?: Prisma.TestResultSumOrderByAggregateInput;
};
export type TestResultScalarWhereWithAggregatesInput = {
    AND?: Prisma.TestResultScalarWhereWithAggregatesInput | Prisma.TestResultScalarWhereWithAggregatesInput[];
    OR?: Prisma.TestResultScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TestResultScalarWhereWithAggregatesInput | Prisma.TestResultScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"TestResult"> | string;
    studentId?: Prisma.StringWithAggregatesFilter<"TestResult"> | string;
    testId?: Prisma.StringWithAggregatesFilter<"TestResult"> | string;
    score?: Prisma.IntWithAggregatesFilter<"TestResult"> | number;
    rank?: Prisma.IntNullableWithAggregatesFilter<"TestResult"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"TestResult"> | Date | string;
};
export type TestResultCreateInput = {
    id?: string;
    score: number;
    rank?: number | null;
    createdAt?: Date | string;
    student: Prisma.UserCreateNestedOneWithoutTestResultsInput;
    test: Prisma.TestCreateNestedOneWithoutResultsInput;
};
export type TestResultUncheckedCreateInput = {
    id?: string;
    studentId: string;
    testId: string;
    score: number;
    rank?: number | null;
    createdAt?: Date | string;
};
export type TestResultUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    rank?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    student?: Prisma.UserUpdateOneRequiredWithoutTestResultsNestedInput;
    test?: Prisma.TestUpdateOneRequiredWithoutResultsNestedInput;
};
export type TestResultUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    studentId?: Prisma.StringFieldUpdateOperationsInput | string;
    testId?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    rank?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TestResultCreateManyInput = {
    id?: string;
    studentId: string;
    testId: string;
    score: number;
    rank?: number | null;
    createdAt?: Date | string;
};
export type TestResultUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    rank?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TestResultUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    studentId?: Prisma.StringFieldUpdateOperationsInput | string;
    testId?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    rank?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TestResultListRelationFilter = {
    every?: Prisma.TestResultWhereInput;
    some?: Prisma.TestResultWhereInput;
    none?: Prisma.TestResultWhereInput;
};
export type TestResultOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TestResultCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    studentId?: Prisma.SortOrder;
    testId?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    rank?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TestResultAvgOrderByAggregateInput = {
    score?: Prisma.SortOrder;
    rank?: Prisma.SortOrder;
};
export type TestResultMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    studentId?: Prisma.SortOrder;
    testId?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    rank?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TestResultMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    studentId?: Prisma.SortOrder;
    testId?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    rank?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TestResultSumOrderByAggregateInput = {
    score?: Prisma.SortOrder;
    rank?: Prisma.SortOrder;
};
export type TestResultCreateNestedManyWithoutStudentInput = {
    create?: Prisma.XOR<Prisma.TestResultCreateWithoutStudentInput, Prisma.TestResultUncheckedCreateWithoutStudentInput> | Prisma.TestResultCreateWithoutStudentInput[] | Prisma.TestResultUncheckedCreateWithoutStudentInput[];
    connectOrCreate?: Prisma.TestResultCreateOrConnectWithoutStudentInput | Prisma.TestResultCreateOrConnectWithoutStudentInput[];
    createMany?: Prisma.TestResultCreateManyStudentInputEnvelope;
    connect?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
};
export type TestResultUncheckedCreateNestedManyWithoutStudentInput = {
    create?: Prisma.XOR<Prisma.TestResultCreateWithoutStudentInput, Prisma.TestResultUncheckedCreateWithoutStudentInput> | Prisma.TestResultCreateWithoutStudentInput[] | Prisma.TestResultUncheckedCreateWithoutStudentInput[];
    connectOrCreate?: Prisma.TestResultCreateOrConnectWithoutStudentInput | Prisma.TestResultCreateOrConnectWithoutStudentInput[];
    createMany?: Prisma.TestResultCreateManyStudentInputEnvelope;
    connect?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
};
export type TestResultUpdateManyWithoutStudentNestedInput = {
    create?: Prisma.XOR<Prisma.TestResultCreateWithoutStudentInput, Prisma.TestResultUncheckedCreateWithoutStudentInput> | Prisma.TestResultCreateWithoutStudentInput[] | Prisma.TestResultUncheckedCreateWithoutStudentInput[];
    connectOrCreate?: Prisma.TestResultCreateOrConnectWithoutStudentInput | Prisma.TestResultCreateOrConnectWithoutStudentInput[];
    upsert?: Prisma.TestResultUpsertWithWhereUniqueWithoutStudentInput | Prisma.TestResultUpsertWithWhereUniqueWithoutStudentInput[];
    createMany?: Prisma.TestResultCreateManyStudentInputEnvelope;
    set?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
    disconnect?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
    delete?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
    connect?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
    update?: Prisma.TestResultUpdateWithWhereUniqueWithoutStudentInput | Prisma.TestResultUpdateWithWhereUniqueWithoutStudentInput[];
    updateMany?: Prisma.TestResultUpdateManyWithWhereWithoutStudentInput | Prisma.TestResultUpdateManyWithWhereWithoutStudentInput[];
    deleteMany?: Prisma.TestResultScalarWhereInput | Prisma.TestResultScalarWhereInput[];
};
export type TestResultUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: Prisma.XOR<Prisma.TestResultCreateWithoutStudentInput, Prisma.TestResultUncheckedCreateWithoutStudentInput> | Prisma.TestResultCreateWithoutStudentInput[] | Prisma.TestResultUncheckedCreateWithoutStudentInput[];
    connectOrCreate?: Prisma.TestResultCreateOrConnectWithoutStudentInput | Prisma.TestResultCreateOrConnectWithoutStudentInput[];
    upsert?: Prisma.TestResultUpsertWithWhereUniqueWithoutStudentInput | Prisma.TestResultUpsertWithWhereUniqueWithoutStudentInput[];
    createMany?: Prisma.TestResultCreateManyStudentInputEnvelope;
    set?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
    disconnect?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
    delete?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
    connect?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
    update?: Prisma.TestResultUpdateWithWhereUniqueWithoutStudentInput | Prisma.TestResultUpdateWithWhereUniqueWithoutStudentInput[];
    updateMany?: Prisma.TestResultUpdateManyWithWhereWithoutStudentInput | Prisma.TestResultUpdateManyWithWhereWithoutStudentInput[];
    deleteMany?: Prisma.TestResultScalarWhereInput | Prisma.TestResultScalarWhereInput[];
};
export type TestResultCreateNestedManyWithoutTestInput = {
    create?: Prisma.XOR<Prisma.TestResultCreateWithoutTestInput, Prisma.TestResultUncheckedCreateWithoutTestInput> | Prisma.TestResultCreateWithoutTestInput[] | Prisma.TestResultUncheckedCreateWithoutTestInput[];
    connectOrCreate?: Prisma.TestResultCreateOrConnectWithoutTestInput | Prisma.TestResultCreateOrConnectWithoutTestInput[];
    createMany?: Prisma.TestResultCreateManyTestInputEnvelope;
    connect?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
};
export type TestResultUncheckedCreateNestedManyWithoutTestInput = {
    create?: Prisma.XOR<Prisma.TestResultCreateWithoutTestInput, Prisma.TestResultUncheckedCreateWithoutTestInput> | Prisma.TestResultCreateWithoutTestInput[] | Prisma.TestResultUncheckedCreateWithoutTestInput[];
    connectOrCreate?: Prisma.TestResultCreateOrConnectWithoutTestInput | Prisma.TestResultCreateOrConnectWithoutTestInput[];
    createMany?: Prisma.TestResultCreateManyTestInputEnvelope;
    connect?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
};
export type TestResultUpdateManyWithoutTestNestedInput = {
    create?: Prisma.XOR<Prisma.TestResultCreateWithoutTestInput, Prisma.TestResultUncheckedCreateWithoutTestInput> | Prisma.TestResultCreateWithoutTestInput[] | Prisma.TestResultUncheckedCreateWithoutTestInput[];
    connectOrCreate?: Prisma.TestResultCreateOrConnectWithoutTestInput | Prisma.TestResultCreateOrConnectWithoutTestInput[];
    upsert?: Prisma.TestResultUpsertWithWhereUniqueWithoutTestInput | Prisma.TestResultUpsertWithWhereUniqueWithoutTestInput[];
    createMany?: Prisma.TestResultCreateManyTestInputEnvelope;
    set?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
    disconnect?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
    delete?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
    connect?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
    update?: Prisma.TestResultUpdateWithWhereUniqueWithoutTestInput | Prisma.TestResultUpdateWithWhereUniqueWithoutTestInput[];
    updateMany?: Prisma.TestResultUpdateManyWithWhereWithoutTestInput | Prisma.TestResultUpdateManyWithWhereWithoutTestInput[];
    deleteMany?: Prisma.TestResultScalarWhereInput | Prisma.TestResultScalarWhereInput[];
};
export type TestResultUncheckedUpdateManyWithoutTestNestedInput = {
    create?: Prisma.XOR<Prisma.TestResultCreateWithoutTestInput, Prisma.TestResultUncheckedCreateWithoutTestInput> | Prisma.TestResultCreateWithoutTestInput[] | Prisma.TestResultUncheckedCreateWithoutTestInput[];
    connectOrCreate?: Prisma.TestResultCreateOrConnectWithoutTestInput | Prisma.TestResultCreateOrConnectWithoutTestInput[];
    upsert?: Prisma.TestResultUpsertWithWhereUniqueWithoutTestInput | Prisma.TestResultUpsertWithWhereUniqueWithoutTestInput[];
    createMany?: Prisma.TestResultCreateManyTestInputEnvelope;
    set?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
    disconnect?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
    delete?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
    connect?: Prisma.TestResultWhereUniqueInput | Prisma.TestResultWhereUniqueInput[];
    update?: Prisma.TestResultUpdateWithWhereUniqueWithoutTestInput | Prisma.TestResultUpdateWithWhereUniqueWithoutTestInput[];
    updateMany?: Prisma.TestResultUpdateManyWithWhereWithoutTestInput | Prisma.TestResultUpdateManyWithWhereWithoutTestInput[];
    deleteMany?: Prisma.TestResultScalarWhereInput | Prisma.TestResultScalarWhereInput[];
};
export type TestResultCreateWithoutStudentInput = {
    id?: string;
    score: number;
    rank?: number | null;
    createdAt?: Date | string;
    test: Prisma.TestCreateNestedOneWithoutResultsInput;
};
export type TestResultUncheckedCreateWithoutStudentInput = {
    id?: string;
    testId: string;
    score: number;
    rank?: number | null;
    createdAt?: Date | string;
};
export type TestResultCreateOrConnectWithoutStudentInput = {
    where: Prisma.TestResultWhereUniqueInput;
    create: Prisma.XOR<Prisma.TestResultCreateWithoutStudentInput, Prisma.TestResultUncheckedCreateWithoutStudentInput>;
};
export type TestResultCreateManyStudentInputEnvelope = {
    data: Prisma.TestResultCreateManyStudentInput | Prisma.TestResultCreateManyStudentInput[];
    skipDuplicates?: boolean;
};
export type TestResultUpsertWithWhereUniqueWithoutStudentInput = {
    where: Prisma.TestResultWhereUniqueInput;
    update: Prisma.XOR<Prisma.TestResultUpdateWithoutStudentInput, Prisma.TestResultUncheckedUpdateWithoutStudentInput>;
    create: Prisma.XOR<Prisma.TestResultCreateWithoutStudentInput, Prisma.TestResultUncheckedCreateWithoutStudentInput>;
};
export type TestResultUpdateWithWhereUniqueWithoutStudentInput = {
    where: Prisma.TestResultWhereUniqueInput;
    data: Prisma.XOR<Prisma.TestResultUpdateWithoutStudentInput, Prisma.TestResultUncheckedUpdateWithoutStudentInput>;
};
export type TestResultUpdateManyWithWhereWithoutStudentInput = {
    where: Prisma.TestResultScalarWhereInput;
    data: Prisma.XOR<Prisma.TestResultUpdateManyMutationInput, Prisma.TestResultUncheckedUpdateManyWithoutStudentInput>;
};
export type TestResultScalarWhereInput = {
    AND?: Prisma.TestResultScalarWhereInput | Prisma.TestResultScalarWhereInput[];
    OR?: Prisma.TestResultScalarWhereInput[];
    NOT?: Prisma.TestResultScalarWhereInput | Prisma.TestResultScalarWhereInput[];
    id?: Prisma.StringFilter<"TestResult"> | string;
    studentId?: Prisma.StringFilter<"TestResult"> | string;
    testId?: Prisma.StringFilter<"TestResult"> | string;
    score?: Prisma.IntFilter<"TestResult"> | number;
    rank?: Prisma.IntNullableFilter<"TestResult"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"TestResult"> | Date | string;
};
export type TestResultCreateWithoutTestInput = {
    id?: string;
    score: number;
    rank?: number | null;
    createdAt?: Date | string;
    student: Prisma.UserCreateNestedOneWithoutTestResultsInput;
};
export type TestResultUncheckedCreateWithoutTestInput = {
    id?: string;
    studentId: string;
    score: number;
    rank?: number | null;
    createdAt?: Date | string;
};
export type TestResultCreateOrConnectWithoutTestInput = {
    where: Prisma.TestResultWhereUniqueInput;
    create: Prisma.XOR<Prisma.TestResultCreateWithoutTestInput, Prisma.TestResultUncheckedCreateWithoutTestInput>;
};
export type TestResultCreateManyTestInputEnvelope = {
    data: Prisma.TestResultCreateManyTestInput | Prisma.TestResultCreateManyTestInput[];
    skipDuplicates?: boolean;
};
export type TestResultUpsertWithWhereUniqueWithoutTestInput = {
    where: Prisma.TestResultWhereUniqueInput;
    update: Prisma.XOR<Prisma.TestResultUpdateWithoutTestInput, Prisma.TestResultUncheckedUpdateWithoutTestInput>;
    create: Prisma.XOR<Prisma.TestResultCreateWithoutTestInput, Prisma.TestResultUncheckedCreateWithoutTestInput>;
};
export type TestResultUpdateWithWhereUniqueWithoutTestInput = {
    where: Prisma.TestResultWhereUniqueInput;
    data: Prisma.XOR<Prisma.TestResultUpdateWithoutTestInput, Prisma.TestResultUncheckedUpdateWithoutTestInput>;
};
export type TestResultUpdateManyWithWhereWithoutTestInput = {
    where: Prisma.TestResultScalarWhereInput;
    data: Prisma.XOR<Prisma.TestResultUpdateManyMutationInput, Prisma.TestResultUncheckedUpdateManyWithoutTestInput>;
};
export type TestResultCreateManyStudentInput = {
    id?: string;
    testId: string;
    score: number;
    rank?: number | null;
    createdAt?: Date | string;
};
export type TestResultUpdateWithoutStudentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    rank?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    test?: Prisma.TestUpdateOneRequiredWithoutResultsNestedInput;
};
export type TestResultUncheckedUpdateWithoutStudentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    testId?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    rank?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TestResultUncheckedUpdateManyWithoutStudentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    testId?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    rank?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TestResultCreateManyTestInput = {
    id?: string;
    studentId: string;
    score: number;
    rank?: number | null;
    createdAt?: Date | string;
};
export type TestResultUpdateWithoutTestInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    rank?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    student?: Prisma.UserUpdateOneRequiredWithoutTestResultsNestedInput;
};
export type TestResultUncheckedUpdateWithoutTestInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    studentId?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    rank?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TestResultUncheckedUpdateManyWithoutTestInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    studentId?: Prisma.StringFieldUpdateOperationsInput | string;
    score?: Prisma.IntFieldUpdateOperationsInput | number;
    rank?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TestResultSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    studentId?: boolean;
    testId?: boolean;
    score?: boolean;
    rank?: boolean;
    createdAt?: boolean;
    student?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    test?: boolean | Prisma.TestDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["testResult"]>;
export type TestResultSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    studentId?: boolean;
    testId?: boolean;
    score?: boolean;
    rank?: boolean;
    createdAt?: boolean;
    student?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    test?: boolean | Prisma.TestDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["testResult"]>;
export type TestResultSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    studentId?: boolean;
    testId?: boolean;
    score?: boolean;
    rank?: boolean;
    createdAt?: boolean;
    student?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    test?: boolean | Prisma.TestDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["testResult"]>;
export type TestResultSelectScalar = {
    id?: boolean;
    studentId?: boolean;
    testId?: boolean;
    score?: boolean;
    rank?: boolean;
    createdAt?: boolean;
};
export type TestResultOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "studentId" | "testId" | "score" | "rank" | "createdAt", ExtArgs["result"]["testResult"]>;
export type TestResultInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    student?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    test?: boolean | Prisma.TestDefaultArgs<ExtArgs>;
};
export type TestResultIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    student?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    test?: boolean | Prisma.TestDefaultArgs<ExtArgs>;
};
export type TestResultIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    student?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    test?: boolean | Prisma.TestDefaultArgs<ExtArgs>;
};
export type $TestResultPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TestResult";
    objects: {
        student: Prisma.$UserPayload<ExtArgs>;
        test: Prisma.$TestPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        studentId: string;
        testId: string;
        score: number;
        rank: number | null;
        createdAt: Date;
    }, ExtArgs["result"]["testResult"]>;
    composites: {};
};
export type TestResultGetPayload<S extends boolean | null | undefined | TestResultDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TestResultPayload, S>;
export type TestResultCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TestResultFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TestResultCountAggregateInputType | true;
};
export interface TestResultDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TestResult'];
        meta: {
            name: 'TestResult';
        };
    };
    findUnique<T extends TestResultFindUniqueArgs>(args: Prisma.SelectSubset<T, TestResultFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TestResultClient<runtime.Types.Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TestResultFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TestResultFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TestResultClient<runtime.Types.Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TestResultFindFirstArgs>(args?: Prisma.SelectSubset<T, TestResultFindFirstArgs<ExtArgs>>): Prisma.Prisma__TestResultClient<runtime.Types.Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TestResultFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TestResultFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TestResultClient<runtime.Types.Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TestResultFindManyArgs>(args?: Prisma.SelectSubset<T, TestResultFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TestResultCreateArgs>(args: Prisma.SelectSubset<T, TestResultCreateArgs<ExtArgs>>): Prisma.Prisma__TestResultClient<runtime.Types.Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TestResultCreateManyArgs>(args?: Prisma.SelectSubset<T, TestResultCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TestResultCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TestResultCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TestResultDeleteArgs>(args: Prisma.SelectSubset<T, TestResultDeleteArgs<ExtArgs>>): Prisma.Prisma__TestResultClient<runtime.Types.Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TestResultUpdateArgs>(args: Prisma.SelectSubset<T, TestResultUpdateArgs<ExtArgs>>): Prisma.Prisma__TestResultClient<runtime.Types.Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TestResultDeleteManyArgs>(args?: Prisma.SelectSubset<T, TestResultDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TestResultUpdateManyArgs>(args: Prisma.SelectSubset<T, TestResultUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TestResultUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TestResultUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TestResultUpsertArgs>(args: Prisma.SelectSubset<T, TestResultUpsertArgs<ExtArgs>>): Prisma.Prisma__TestResultClient<runtime.Types.Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TestResultCountArgs>(args?: Prisma.Subset<T, TestResultCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TestResultCountAggregateOutputType> : number>;
    aggregate<T extends TestResultAggregateArgs>(args: Prisma.Subset<T, TestResultAggregateArgs>): Prisma.PrismaPromise<GetTestResultAggregateType<T>>;
    groupBy<T extends TestResultGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TestResultGroupByArgs['orderBy'];
    } : {
        orderBy?: TestResultGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TestResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TestResultFieldRefs;
}
export interface Prisma__TestResultClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    student<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    test<T extends Prisma.TestDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TestDefaultArgs<ExtArgs>>): Prisma.Prisma__TestClient<runtime.Types.Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TestResultFieldRefs {
    readonly id: Prisma.FieldRef<"TestResult", 'String'>;
    readonly studentId: Prisma.FieldRef<"TestResult", 'String'>;
    readonly testId: Prisma.FieldRef<"TestResult", 'String'>;
    readonly score: Prisma.FieldRef<"TestResult", 'Int'>;
    readonly rank: Prisma.FieldRef<"TestResult", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"TestResult", 'DateTime'>;
}
export type TestResultFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestResultSelect<ExtArgs> | null;
    omit?: Prisma.TestResultOmit<ExtArgs> | null;
    include?: Prisma.TestResultInclude<ExtArgs> | null;
    where: Prisma.TestResultWhereUniqueInput;
};
export type TestResultFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestResultSelect<ExtArgs> | null;
    omit?: Prisma.TestResultOmit<ExtArgs> | null;
    include?: Prisma.TestResultInclude<ExtArgs> | null;
    where: Prisma.TestResultWhereUniqueInput;
};
export type TestResultFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TestResultFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TestResultFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TestResultCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestResultSelect<ExtArgs> | null;
    omit?: Prisma.TestResultOmit<ExtArgs> | null;
    include?: Prisma.TestResultInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TestResultCreateInput, Prisma.TestResultUncheckedCreateInput>;
};
export type TestResultCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TestResultCreateManyInput | Prisma.TestResultCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TestResultCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestResultSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TestResultOmit<ExtArgs> | null;
    data: Prisma.TestResultCreateManyInput | Prisma.TestResultCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TestResultIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TestResultUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestResultSelect<ExtArgs> | null;
    omit?: Prisma.TestResultOmit<ExtArgs> | null;
    include?: Prisma.TestResultInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TestResultUpdateInput, Prisma.TestResultUncheckedUpdateInput>;
    where: Prisma.TestResultWhereUniqueInput;
};
export type TestResultUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TestResultUpdateManyMutationInput, Prisma.TestResultUncheckedUpdateManyInput>;
    where?: Prisma.TestResultWhereInput;
    limit?: number;
};
export type TestResultUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestResultSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TestResultOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TestResultUpdateManyMutationInput, Prisma.TestResultUncheckedUpdateManyInput>;
    where?: Prisma.TestResultWhereInput;
    limit?: number;
    include?: Prisma.TestResultIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TestResultUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestResultSelect<ExtArgs> | null;
    omit?: Prisma.TestResultOmit<ExtArgs> | null;
    include?: Prisma.TestResultInclude<ExtArgs> | null;
    where: Prisma.TestResultWhereUniqueInput;
    create: Prisma.XOR<Prisma.TestResultCreateInput, Prisma.TestResultUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TestResultUpdateInput, Prisma.TestResultUncheckedUpdateInput>;
};
export type TestResultDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestResultSelect<ExtArgs> | null;
    omit?: Prisma.TestResultOmit<ExtArgs> | null;
    include?: Prisma.TestResultInclude<ExtArgs> | null;
    where: Prisma.TestResultWhereUniqueInput;
};
export type TestResultDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TestResultWhereInput;
    limit?: number;
};
export type TestResultDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestResultSelect<ExtArgs> | null;
    omit?: Prisma.TestResultOmit<ExtArgs> | null;
    include?: Prisma.TestResultInclude<ExtArgs> | null;
};
export {};
