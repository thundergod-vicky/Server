import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type StudentProgressModel = runtime.Types.Result.DefaultSelection<Prisma.$StudentProgressPayload>;
export type AggregateStudentProgress = {
    _count: StudentProgressCountAggregateOutputType | null;
    _avg: StudentProgressAvgAggregateOutputType | null;
    _sum: StudentProgressSumAggregateOutputType | null;
    _min: StudentProgressMinAggregateOutputType | null;
    _max: StudentProgressMaxAggregateOutputType | null;
};
export type StudentProgressAvgAggregateOutputType = {
    score: number | null;
};
export type StudentProgressSumAggregateOutputType = {
    score: number | null;
};
export type StudentProgressMinAggregateOutputType = {
    id: string | null;
    studentId: string | null;
    lessonId: string | null;
    completed: boolean | null;
    score: number | null;
    completedAt: Date | null;
};
export type StudentProgressMaxAggregateOutputType = {
    id: string | null;
    studentId: string | null;
    lessonId: string | null;
    completed: boolean | null;
    score: number | null;
    completedAt: Date | null;
};
export type StudentProgressCountAggregateOutputType = {
    id: number;
    studentId: number;
    lessonId: number;
    completed: number;
    score: number;
    completedAt: number;
    _all: number;
};
export type StudentProgressAvgAggregateInputType = {
    score?: true;
};
export type StudentProgressSumAggregateInputType = {
    score?: true;
};
export type StudentProgressMinAggregateInputType = {
    id?: true;
    studentId?: true;
    lessonId?: true;
    completed?: true;
    score?: true;
    completedAt?: true;
};
export type StudentProgressMaxAggregateInputType = {
    id?: true;
    studentId?: true;
    lessonId?: true;
    completed?: true;
    score?: true;
    completedAt?: true;
};
export type StudentProgressCountAggregateInputType = {
    id?: true;
    studentId?: true;
    lessonId?: true;
    completed?: true;
    score?: true;
    completedAt?: true;
    _all?: true;
};
export type StudentProgressAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StudentProgressWhereInput;
    orderBy?: Prisma.StudentProgressOrderByWithRelationInput | Prisma.StudentProgressOrderByWithRelationInput[];
    cursor?: Prisma.StudentProgressWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | StudentProgressCountAggregateInputType;
    _avg?: StudentProgressAvgAggregateInputType;
    _sum?: StudentProgressSumAggregateInputType;
    _min?: StudentProgressMinAggregateInputType;
    _max?: StudentProgressMaxAggregateInputType;
};
export type GetStudentProgressAggregateType<T extends StudentProgressAggregateArgs> = {
    [P in keyof T & keyof AggregateStudentProgress]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStudentProgress[P]> : Prisma.GetScalarType<T[P], AggregateStudentProgress[P]>;
};
export type StudentProgressGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StudentProgressWhereInput;
    orderBy?: Prisma.StudentProgressOrderByWithAggregationInput | Prisma.StudentProgressOrderByWithAggregationInput[];
    by: Prisma.StudentProgressScalarFieldEnum[] | Prisma.StudentProgressScalarFieldEnum;
    having?: Prisma.StudentProgressScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StudentProgressCountAggregateInputType | true;
    _avg?: StudentProgressAvgAggregateInputType;
    _sum?: StudentProgressSumAggregateInputType;
    _min?: StudentProgressMinAggregateInputType;
    _max?: StudentProgressMaxAggregateInputType;
};
export type StudentProgressGroupByOutputType = {
    id: string;
    studentId: string;
    lessonId: string;
    completed: boolean;
    score: number | null;
    completedAt: Date | null;
    _count: StudentProgressCountAggregateOutputType | null;
    _avg: StudentProgressAvgAggregateOutputType | null;
    _sum: StudentProgressSumAggregateOutputType | null;
    _min: StudentProgressMinAggregateOutputType | null;
    _max: StudentProgressMaxAggregateOutputType | null;
};
type GetStudentProgressGroupByPayload<T extends StudentProgressGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StudentProgressGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StudentProgressGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StudentProgressGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StudentProgressGroupByOutputType[P]>;
}>>;
export type StudentProgressWhereInput = {
    AND?: Prisma.StudentProgressWhereInput | Prisma.StudentProgressWhereInput[];
    OR?: Prisma.StudentProgressWhereInput[];
    NOT?: Prisma.StudentProgressWhereInput | Prisma.StudentProgressWhereInput[];
    id?: Prisma.StringFilter<"StudentProgress"> | string;
    studentId?: Prisma.StringFilter<"StudentProgress"> | string;
    lessonId?: Prisma.StringFilter<"StudentProgress"> | string;
    completed?: Prisma.BoolFilter<"StudentProgress"> | boolean;
    score?: Prisma.IntNullableFilter<"StudentProgress"> | number | null;
    completedAt?: Prisma.DateTimeNullableFilter<"StudentProgress"> | Date | string | null;
    student?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    lesson?: Prisma.XOR<Prisma.LessonScalarRelationFilter, Prisma.LessonWhereInput>;
};
export type StudentProgressOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    studentId?: Prisma.SortOrder;
    lessonId?: Prisma.SortOrder;
    completed?: Prisma.SortOrder;
    score?: Prisma.SortOrderInput | Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    student?: Prisma.UserOrderByWithRelationInput;
    lesson?: Prisma.LessonOrderByWithRelationInput;
};
export type StudentProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    studentId_lessonId?: Prisma.StudentProgressStudentIdLessonIdCompoundUniqueInput;
    AND?: Prisma.StudentProgressWhereInput | Prisma.StudentProgressWhereInput[];
    OR?: Prisma.StudentProgressWhereInput[];
    NOT?: Prisma.StudentProgressWhereInput | Prisma.StudentProgressWhereInput[];
    studentId?: Prisma.StringFilter<"StudentProgress"> | string;
    lessonId?: Prisma.StringFilter<"StudentProgress"> | string;
    completed?: Prisma.BoolFilter<"StudentProgress"> | boolean;
    score?: Prisma.IntNullableFilter<"StudentProgress"> | number | null;
    completedAt?: Prisma.DateTimeNullableFilter<"StudentProgress"> | Date | string | null;
    student?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    lesson?: Prisma.XOR<Prisma.LessonScalarRelationFilter, Prisma.LessonWhereInput>;
}, "id" | "studentId_lessonId">;
export type StudentProgressOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    studentId?: Prisma.SortOrder;
    lessonId?: Prisma.SortOrder;
    completed?: Prisma.SortOrder;
    score?: Prisma.SortOrderInput | Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.StudentProgressCountOrderByAggregateInput;
    _avg?: Prisma.StudentProgressAvgOrderByAggregateInput;
    _max?: Prisma.StudentProgressMaxOrderByAggregateInput;
    _min?: Prisma.StudentProgressMinOrderByAggregateInput;
    _sum?: Prisma.StudentProgressSumOrderByAggregateInput;
};
export type StudentProgressScalarWhereWithAggregatesInput = {
    AND?: Prisma.StudentProgressScalarWhereWithAggregatesInput | Prisma.StudentProgressScalarWhereWithAggregatesInput[];
    OR?: Prisma.StudentProgressScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StudentProgressScalarWhereWithAggregatesInput | Prisma.StudentProgressScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"StudentProgress"> | string;
    studentId?: Prisma.StringWithAggregatesFilter<"StudentProgress"> | string;
    lessonId?: Prisma.StringWithAggregatesFilter<"StudentProgress"> | string;
    completed?: Prisma.BoolWithAggregatesFilter<"StudentProgress"> | boolean;
    score?: Prisma.IntNullableWithAggregatesFilter<"StudentProgress"> | number | null;
    completedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"StudentProgress"> | Date | string | null;
};
export type StudentProgressCreateInput = {
    id?: string;
    completed?: boolean;
    score?: number | null;
    completedAt?: Date | string | null;
    student: Prisma.UserCreateNestedOneWithoutProgressInput;
    lesson: Prisma.LessonCreateNestedOneWithoutProgressInput;
};
export type StudentProgressUncheckedCreateInput = {
    id?: string;
    studentId: string;
    lessonId: string;
    completed?: boolean;
    score?: number | null;
    completedAt?: Date | string | null;
};
export type StudentProgressUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    completed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    student?: Prisma.UserUpdateOneRequiredWithoutProgressNestedInput;
    lesson?: Prisma.LessonUpdateOneRequiredWithoutProgressNestedInput;
};
export type StudentProgressUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    studentId?: Prisma.StringFieldUpdateOperationsInput | string;
    lessonId?: Prisma.StringFieldUpdateOperationsInput | string;
    completed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StudentProgressCreateManyInput = {
    id?: string;
    studentId: string;
    lessonId: string;
    completed?: boolean;
    score?: number | null;
    completedAt?: Date | string | null;
};
export type StudentProgressUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    completed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StudentProgressUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    studentId?: Prisma.StringFieldUpdateOperationsInput | string;
    lessonId?: Prisma.StringFieldUpdateOperationsInput | string;
    completed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StudentProgressListRelationFilter = {
    every?: Prisma.StudentProgressWhereInput;
    some?: Prisma.StudentProgressWhereInput;
    none?: Prisma.StudentProgressWhereInput;
};
export type StudentProgressOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StudentProgressStudentIdLessonIdCompoundUniqueInput = {
    studentId: string;
    lessonId: string;
};
export type StudentProgressCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    studentId?: Prisma.SortOrder;
    lessonId?: Prisma.SortOrder;
    completed?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
};
export type StudentProgressAvgOrderByAggregateInput = {
    score?: Prisma.SortOrder;
};
export type StudentProgressMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    studentId?: Prisma.SortOrder;
    lessonId?: Prisma.SortOrder;
    completed?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
};
export type StudentProgressMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    studentId?: Prisma.SortOrder;
    lessonId?: Prisma.SortOrder;
    completed?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
};
export type StudentProgressSumOrderByAggregateInput = {
    score?: Prisma.SortOrder;
};
export type StudentProgressCreateNestedManyWithoutStudentInput = {
    create?: Prisma.XOR<Prisma.StudentProgressCreateWithoutStudentInput, Prisma.StudentProgressUncheckedCreateWithoutStudentInput> | Prisma.StudentProgressCreateWithoutStudentInput[] | Prisma.StudentProgressUncheckedCreateWithoutStudentInput[];
    connectOrCreate?: Prisma.StudentProgressCreateOrConnectWithoutStudentInput | Prisma.StudentProgressCreateOrConnectWithoutStudentInput[];
    createMany?: Prisma.StudentProgressCreateManyStudentInputEnvelope;
    connect?: Prisma.StudentProgressWhereUniqueInput | Prisma.StudentProgressWhereUniqueInput[];
};
export type StudentProgressUncheckedCreateNestedManyWithoutStudentInput = {
    create?: Prisma.XOR<Prisma.StudentProgressCreateWithoutStudentInput, Prisma.StudentProgressUncheckedCreateWithoutStudentInput> | Prisma.StudentProgressCreateWithoutStudentInput[] | Prisma.StudentProgressUncheckedCreateWithoutStudentInput[];
    connectOrCreate?: Prisma.StudentProgressCreateOrConnectWithoutStudentInput | Prisma.StudentProgressCreateOrConnectWithoutStudentInput[];
    createMany?: Prisma.StudentProgressCreateManyStudentInputEnvelope;
    connect?: Prisma.StudentProgressWhereUniqueInput | Prisma.StudentProgressWhereUniqueInput[];
};
export type StudentProgressUpdateManyWithoutStudentNestedInput = {
    create?: Prisma.XOR<Prisma.StudentProgressCreateWithoutStudentInput, Prisma.StudentProgressUncheckedCreateWithoutStudentInput> | Prisma.StudentProgressCreateWithoutStudentInput[] | Prisma.StudentProgressUncheckedCreateWithoutStudentInput[];
    connectOrCreate?: Prisma.StudentProgressCreateOrConnectWithoutStudentInput | Prisma.StudentProgressCreateOrConnectWithoutStudentInput[];
    upsert?: Prisma.StudentProgressUpsertWithWhereUniqueWithoutStudentInput | Prisma.StudentProgressUpsertWithWhereUniqueWithoutStudentInput[];
    createMany?: Prisma.StudentProgressCreateManyStudentInputEnvelope;
    set?: Prisma.StudentProgressWhereUniqueInput | Prisma.StudentProgressWhereUniqueInput[];
    disconnect?: Prisma.StudentProgressWhereUniqueInput | Prisma.StudentProgressWhereUniqueInput[];
    delete?: Prisma.StudentProgressWhereUniqueInput | Prisma.StudentProgressWhereUniqueInput[];
    connect?: Prisma.StudentProgressWhereUniqueInput | Prisma.StudentProgressWhereUniqueInput[];
    update?: Prisma.StudentProgressUpdateWithWhereUniqueWithoutStudentInput | Prisma.StudentProgressUpdateWithWhereUniqueWithoutStudentInput[];
    updateMany?: Prisma.StudentProgressUpdateManyWithWhereWithoutStudentInput | Prisma.StudentProgressUpdateManyWithWhereWithoutStudentInput[];
    deleteMany?: Prisma.StudentProgressScalarWhereInput | Prisma.StudentProgressScalarWhereInput[];
};
export type StudentProgressUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: Prisma.XOR<Prisma.StudentProgressCreateWithoutStudentInput, Prisma.StudentProgressUncheckedCreateWithoutStudentInput> | Prisma.StudentProgressCreateWithoutStudentInput[] | Prisma.StudentProgressUncheckedCreateWithoutStudentInput[];
    connectOrCreate?: Prisma.StudentProgressCreateOrConnectWithoutStudentInput | Prisma.StudentProgressCreateOrConnectWithoutStudentInput[];
    upsert?: Prisma.StudentProgressUpsertWithWhereUniqueWithoutStudentInput | Prisma.StudentProgressUpsertWithWhereUniqueWithoutStudentInput[];
    createMany?: Prisma.StudentProgressCreateManyStudentInputEnvelope;
    set?: Prisma.StudentProgressWhereUniqueInput | Prisma.StudentProgressWhereUniqueInput[];
    disconnect?: Prisma.StudentProgressWhereUniqueInput | Prisma.StudentProgressWhereUniqueInput[];
    delete?: Prisma.StudentProgressWhereUniqueInput | Prisma.StudentProgressWhereUniqueInput[];
    connect?: Prisma.StudentProgressWhereUniqueInput | Prisma.StudentProgressWhereUniqueInput[];
    update?: Prisma.StudentProgressUpdateWithWhereUniqueWithoutStudentInput | Prisma.StudentProgressUpdateWithWhereUniqueWithoutStudentInput[];
    updateMany?: Prisma.StudentProgressUpdateManyWithWhereWithoutStudentInput | Prisma.StudentProgressUpdateManyWithWhereWithoutStudentInput[];
    deleteMany?: Prisma.StudentProgressScalarWhereInput | Prisma.StudentProgressScalarWhereInput[];
};
export type StudentProgressCreateNestedManyWithoutLessonInput = {
    create?: Prisma.XOR<Prisma.StudentProgressCreateWithoutLessonInput, Prisma.StudentProgressUncheckedCreateWithoutLessonInput> | Prisma.StudentProgressCreateWithoutLessonInput[] | Prisma.StudentProgressUncheckedCreateWithoutLessonInput[];
    connectOrCreate?: Prisma.StudentProgressCreateOrConnectWithoutLessonInput | Prisma.StudentProgressCreateOrConnectWithoutLessonInput[];
    createMany?: Prisma.StudentProgressCreateManyLessonInputEnvelope;
    connect?: Prisma.StudentProgressWhereUniqueInput | Prisma.StudentProgressWhereUniqueInput[];
};
export type StudentProgressUncheckedCreateNestedManyWithoutLessonInput = {
    create?: Prisma.XOR<Prisma.StudentProgressCreateWithoutLessonInput, Prisma.StudentProgressUncheckedCreateWithoutLessonInput> | Prisma.StudentProgressCreateWithoutLessonInput[] | Prisma.StudentProgressUncheckedCreateWithoutLessonInput[];
    connectOrCreate?: Prisma.StudentProgressCreateOrConnectWithoutLessonInput | Prisma.StudentProgressCreateOrConnectWithoutLessonInput[];
    createMany?: Prisma.StudentProgressCreateManyLessonInputEnvelope;
    connect?: Prisma.StudentProgressWhereUniqueInput | Prisma.StudentProgressWhereUniqueInput[];
};
export type StudentProgressUpdateManyWithoutLessonNestedInput = {
    create?: Prisma.XOR<Prisma.StudentProgressCreateWithoutLessonInput, Prisma.StudentProgressUncheckedCreateWithoutLessonInput> | Prisma.StudentProgressCreateWithoutLessonInput[] | Prisma.StudentProgressUncheckedCreateWithoutLessonInput[];
    connectOrCreate?: Prisma.StudentProgressCreateOrConnectWithoutLessonInput | Prisma.StudentProgressCreateOrConnectWithoutLessonInput[];
    upsert?: Prisma.StudentProgressUpsertWithWhereUniqueWithoutLessonInput | Prisma.StudentProgressUpsertWithWhereUniqueWithoutLessonInput[];
    createMany?: Prisma.StudentProgressCreateManyLessonInputEnvelope;
    set?: Prisma.StudentProgressWhereUniqueInput | Prisma.StudentProgressWhereUniqueInput[];
    disconnect?: Prisma.StudentProgressWhereUniqueInput | Prisma.StudentProgressWhereUniqueInput[];
    delete?: Prisma.StudentProgressWhereUniqueInput | Prisma.StudentProgressWhereUniqueInput[];
    connect?: Prisma.StudentProgressWhereUniqueInput | Prisma.StudentProgressWhereUniqueInput[];
    update?: Prisma.StudentProgressUpdateWithWhereUniqueWithoutLessonInput | Prisma.StudentProgressUpdateWithWhereUniqueWithoutLessonInput[];
    updateMany?: Prisma.StudentProgressUpdateManyWithWhereWithoutLessonInput | Prisma.StudentProgressUpdateManyWithWhereWithoutLessonInput[];
    deleteMany?: Prisma.StudentProgressScalarWhereInput | Prisma.StudentProgressScalarWhereInput[];
};
export type StudentProgressUncheckedUpdateManyWithoutLessonNestedInput = {
    create?: Prisma.XOR<Prisma.StudentProgressCreateWithoutLessonInput, Prisma.StudentProgressUncheckedCreateWithoutLessonInput> | Prisma.StudentProgressCreateWithoutLessonInput[] | Prisma.StudentProgressUncheckedCreateWithoutLessonInput[];
    connectOrCreate?: Prisma.StudentProgressCreateOrConnectWithoutLessonInput | Prisma.StudentProgressCreateOrConnectWithoutLessonInput[];
    upsert?: Prisma.StudentProgressUpsertWithWhereUniqueWithoutLessonInput | Prisma.StudentProgressUpsertWithWhereUniqueWithoutLessonInput[];
    createMany?: Prisma.StudentProgressCreateManyLessonInputEnvelope;
    set?: Prisma.StudentProgressWhereUniqueInput | Prisma.StudentProgressWhereUniqueInput[];
    disconnect?: Prisma.StudentProgressWhereUniqueInput | Prisma.StudentProgressWhereUniqueInput[];
    delete?: Prisma.StudentProgressWhereUniqueInput | Prisma.StudentProgressWhereUniqueInput[];
    connect?: Prisma.StudentProgressWhereUniqueInput | Prisma.StudentProgressWhereUniqueInput[];
    update?: Prisma.StudentProgressUpdateWithWhereUniqueWithoutLessonInput | Prisma.StudentProgressUpdateWithWhereUniqueWithoutLessonInput[];
    updateMany?: Prisma.StudentProgressUpdateManyWithWhereWithoutLessonInput | Prisma.StudentProgressUpdateManyWithWhereWithoutLessonInput[];
    deleteMany?: Prisma.StudentProgressScalarWhereInput | Prisma.StudentProgressScalarWhereInput[];
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type StudentProgressCreateWithoutStudentInput = {
    id?: string;
    completed?: boolean;
    score?: number | null;
    completedAt?: Date | string | null;
    lesson: Prisma.LessonCreateNestedOneWithoutProgressInput;
};
export type StudentProgressUncheckedCreateWithoutStudentInput = {
    id?: string;
    lessonId: string;
    completed?: boolean;
    score?: number | null;
    completedAt?: Date | string | null;
};
export type StudentProgressCreateOrConnectWithoutStudentInput = {
    where: Prisma.StudentProgressWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudentProgressCreateWithoutStudentInput, Prisma.StudentProgressUncheckedCreateWithoutStudentInput>;
};
export type StudentProgressCreateManyStudentInputEnvelope = {
    data: Prisma.StudentProgressCreateManyStudentInput | Prisma.StudentProgressCreateManyStudentInput[];
    skipDuplicates?: boolean;
};
export type StudentProgressUpsertWithWhereUniqueWithoutStudentInput = {
    where: Prisma.StudentProgressWhereUniqueInput;
    update: Prisma.XOR<Prisma.StudentProgressUpdateWithoutStudentInput, Prisma.StudentProgressUncheckedUpdateWithoutStudentInput>;
    create: Prisma.XOR<Prisma.StudentProgressCreateWithoutStudentInput, Prisma.StudentProgressUncheckedCreateWithoutStudentInput>;
};
export type StudentProgressUpdateWithWhereUniqueWithoutStudentInput = {
    where: Prisma.StudentProgressWhereUniqueInput;
    data: Prisma.XOR<Prisma.StudentProgressUpdateWithoutStudentInput, Prisma.StudentProgressUncheckedUpdateWithoutStudentInput>;
};
export type StudentProgressUpdateManyWithWhereWithoutStudentInput = {
    where: Prisma.StudentProgressScalarWhereInput;
    data: Prisma.XOR<Prisma.StudentProgressUpdateManyMutationInput, Prisma.StudentProgressUncheckedUpdateManyWithoutStudentInput>;
};
export type StudentProgressScalarWhereInput = {
    AND?: Prisma.StudentProgressScalarWhereInput | Prisma.StudentProgressScalarWhereInput[];
    OR?: Prisma.StudentProgressScalarWhereInput[];
    NOT?: Prisma.StudentProgressScalarWhereInput | Prisma.StudentProgressScalarWhereInput[];
    id?: Prisma.StringFilter<"StudentProgress"> | string;
    studentId?: Prisma.StringFilter<"StudentProgress"> | string;
    lessonId?: Prisma.StringFilter<"StudentProgress"> | string;
    completed?: Prisma.BoolFilter<"StudentProgress"> | boolean;
    score?: Prisma.IntNullableFilter<"StudentProgress"> | number | null;
    completedAt?: Prisma.DateTimeNullableFilter<"StudentProgress"> | Date | string | null;
};
export type StudentProgressCreateWithoutLessonInput = {
    id?: string;
    completed?: boolean;
    score?: number | null;
    completedAt?: Date | string | null;
    student: Prisma.UserCreateNestedOneWithoutProgressInput;
};
export type StudentProgressUncheckedCreateWithoutLessonInput = {
    id?: string;
    studentId: string;
    completed?: boolean;
    score?: number | null;
    completedAt?: Date | string | null;
};
export type StudentProgressCreateOrConnectWithoutLessonInput = {
    where: Prisma.StudentProgressWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudentProgressCreateWithoutLessonInput, Prisma.StudentProgressUncheckedCreateWithoutLessonInput>;
};
export type StudentProgressCreateManyLessonInputEnvelope = {
    data: Prisma.StudentProgressCreateManyLessonInput | Prisma.StudentProgressCreateManyLessonInput[];
    skipDuplicates?: boolean;
};
export type StudentProgressUpsertWithWhereUniqueWithoutLessonInput = {
    where: Prisma.StudentProgressWhereUniqueInput;
    update: Prisma.XOR<Prisma.StudentProgressUpdateWithoutLessonInput, Prisma.StudentProgressUncheckedUpdateWithoutLessonInput>;
    create: Prisma.XOR<Prisma.StudentProgressCreateWithoutLessonInput, Prisma.StudentProgressUncheckedCreateWithoutLessonInput>;
};
export type StudentProgressUpdateWithWhereUniqueWithoutLessonInput = {
    where: Prisma.StudentProgressWhereUniqueInput;
    data: Prisma.XOR<Prisma.StudentProgressUpdateWithoutLessonInput, Prisma.StudentProgressUncheckedUpdateWithoutLessonInput>;
};
export type StudentProgressUpdateManyWithWhereWithoutLessonInput = {
    where: Prisma.StudentProgressScalarWhereInput;
    data: Prisma.XOR<Prisma.StudentProgressUpdateManyMutationInput, Prisma.StudentProgressUncheckedUpdateManyWithoutLessonInput>;
};
export type StudentProgressCreateManyStudentInput = {
    id?: string;
    lessonId: string;
    completed?: boolean;
    score?: number | null;
    completedAt?: Date | string | null;
};
export type StudentProgressUpdateWithoutStudentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    completed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lesson?: Prisma.LessonUpdateOneRequiredWithoutProgressNestedInput;
};
export type StudentProgressUncheckedUpdateWithoutStudentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lessonId?: Prisma.StringFieldUpdateOperationsInput | string;
    completed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StudentProgressUncheckedUpdateManyWithoutStudentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lessonId?: Prisma.StringFieldUpdateOperationsInput | string;
    completed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StudentProgressCreateManyLessonInput = {
    id?: string;
    studentId: string;
    completed?: boolean;
    score?: number | null;
    completedAt?: Date | string | null;
};
export type StudentProgressUpdateWithoutLessonInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    completed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    student?: Prisma.UserUpdateOneRequiredWithoutProgressNestedInput;
};
export type StudentProgressUncheckedUpdateWithoutLessonInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    studentId?: Prisma.StringFieldUpdateOperationsInput | string;
    completed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StudentProgressUncheckedUpdateManyWithoutLessonInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    studentId?: Prisma.StringFieldUpdateOperationsInput | string;
    completed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type StudentProgressSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    studentId?: boolean;
    lessonId?: boolean;
    completed?: boolean;
    score?: boolean;
    completedAt?: boolean;
    student?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    lesson?: boolean | Prisma.LessonDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["studentProgress"]>;
export type StudentProgressSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    studentId?: boolean;
    lessonId?: boolean;
    completed?: boolean;
    score?: boolean;
    completedAt?: boolean;
    student?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    lesson?: boolean | Prisma.LessonDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["studentProgress"]>;
export type StudentProgressSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    studentId?: boolean;
    lessonId?: boolean;
    completed?: boolean;
    score?: boolean;
    completedAt?: boolean;
    student?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    lesson?: boolean | Prisma.LessonDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["studentProgress"]>;
export type StudentProgressSelectScalar = {
    id?: boolean;
    studentId?: boolean;
    lessonId?: boolean;
    completed?: boolean;
    score?: boolean;
    completedAt?: boolean;
};
export type StudentProgressOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "studentId" | "lessonId" | "completed" | "score" | "completedAt", ExtArgs["result"]["studentProgress"]>;
export type StudentProgressInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    student?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    lesson?: boolean | Prisma.LessonDefaultArgs<ExtArgs>;
};
export type StudentProgressIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    student?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    lesson?: boolean | Prisma.LessonDefaultArgs<ExtArgs>;
};
export type StudentProgressIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    student?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    lesson?: boolean | Prisma.LessonDefaultArgs<ExtArgs>;
};
export type $StudentProgressPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "StudentProgress";
    objects: {
        student: Prisma.$UserPayload<ExtArgs>;
        lesson: Prisma.$LessonPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        studentId: string;
        lessonId: string;
        completed: boolean;
        score: number | null;
        completedAt: Date | null;
    }, ExtArgs["result"]["studentProgress"]>;
    composites: {};
};
export type StudentProgressGetPayload<S extends boolean | null | undefined | StudentProgressDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StudentProgressPayload, S>;
export type StudentProgressCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StudentProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StudentProgressCountAggregateInputType | true;
};
export interface StudentProgressDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['StudentProgress'];
        meta: {
            name: 'StudentProgress';
        };
    };
    findUnique<T extends StudentProgressFindUniqueArgs>(args: Prisma.SelectSubset<T, StudentProgressFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StudentProgressClient<runtime.Types.Result.GetResult<Prisma.$StudentProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends StudentProgressFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StudentProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StudentProgressClient<runtime.Types.Result.GetResult<Prisma.$StudentProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends StudentProgressFindFirstArgs>(args?: Prisma.SelectSubset<T, StudentProgressFindFirstArgs<ExtArgs>>): Prisma.Prisma__StudentProgressClient<runtime.Types.Result.GetResult<Prisma.$StudentProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends StudentProgressFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StudentProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StudentProgressClient<runtime.Types.Result.GetResult<Prisma.$StudentProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends StudentProgressFindManyArgs>(args?: Prisma.SelectSubset<T, StudentProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudentProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends StudentProgressCreateArgs>(args: Prisma.SelectSubset<T, StudentProgressCreateArgs<ExtArgs>>): Prisma.Prisma__StudentProgressClient<runtime.Types.Result.GetResult<Prisma.$StudentProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends StudentProgressCreateManyArgs>(args?: Prisma.SelectSubset<T, StudentProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends StudentProgressCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StudentProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudentProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends StudentProgressDeleteArgs>(args: Prisma.SelectSubset<T, StudentProgressDeleteArgs<ExtArgs>>): Prisma.Prisma__StudentProgressClient<runtime.Types.Result.GetResult<Prisma.$StudentProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends StudentProgressUpdateArgs>(args: Prisma.SelectSubset<T, StudentProgressUpdateArgs<ExtArgs>>): Prisma.Prisma__StudentProgressClient<runtime.Types.Result.GetResult<Prisma.$StudentProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends StudentProgressDeleteManyArgs>(args?: Prisma.SelectSubset<T, StudentProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends StudentProgressUpdateManyArgs>(args: Prisma.SelectSubset<T, StudentProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends StudentProgressUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StudentProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudentProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends StudentProgressUpsertArgs>(args: Prisma.SelectSubset<T, StudentProgressUpsertArgs<ExtArgs>>): Prisma.Prisma__StudentProgressClient<runtime.Types.Result.GetResult<Prisma.$StudentProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends StudentProgressCountArgs>(args?: Prisma.Subset<T, StudentProgressCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StudentProgressCountAggregateOutputType> : number>;
    aggregate<T extends StudentProgressAggregateArgs>(args: Prisma.Subset<T, StudentProgressAggregateArgs>): Prisma.PrismaPromise<GetStudentProgressAggregateType<T>>;
    groupBy<T extends StudentProgressGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StudentProgressGroupByArgs['orderBy'];
    } : {
        orderBy?: StudentProgressGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StudentProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: StudentProgressFieldRefs;
}
export interface Prisma__StudentProgressClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    student<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    lesson<T extends Prisma.LessonDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LessonDefaultArgs<ExtArgs>>): Prisma.Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface StudentProgressFieldRefs {
    readonly id: Prisma.FieldRef<"StudentProgress", 'String'>;
    readonly studentId: Prisma.FieldRef<"StudentProgress", 'String'>;
    readonly lessonId: Prisma.FieldRef<"StudentProgress", 'String'>;
    readonly completed: Prisma.FieldRef<"StudentProgress", 'Boolean'>;
    readonly score: Prisma.FieldRef<"StudentProgress", 'Int'>;
    readonly completedAt: Prisma.FieldRef<"StudentProgress", 'DateTime'>;
}
export type StudentProgressFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProgressSelect<ExtArgs> | null;
    omit?: Prisma.StudentProgressOmit<ExtArgs> | null;
    include?: Prisma.StudentProgressInclude<ExtArgs> | null;
    where: Prisma.StudentProgressWhereUniqueInput;
};
export type StudentProgressFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProgressSelect<ExtArgs> | null;
    omit?: Prisma.StudentProgressOmit<ExtArgs> | null;
    include?: Prisma.StudentProgressInclude<ExtArgs> | null;
    where: Prisma.StudentProgressWhereUniqueInput;
};
export type StudentProgressFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProgressSelect<ExtArgs> | null;
    omit?: Prisma.StudentProgressOmit<ExtArgs> | null;
    include?: Prisma.StudentProgressInclude<ExtArgs> | null;
    where?: Prisma.StudentProgressWhereInput;
    orderBy?: Prisma.StudentProgressOrderByWithRelationInput | Prisma.StudentProgressOrderByWithRelationInput[];
    cursor?: Prisma.StudentProgressWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StudentProgressScalarFieldEnum | Prisma.StudentProgressScalarFieldEnum[];
};
export type StudentProgressFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProgressSelect<ExtArgs> | null;
    omit?: Prisma.StudentProgressOmit<ExtArgs> | null;
    include?: Prisma.StudentProgressInclude<ExtArgs> | null;
    where?: Prisma.StudentProgressWhereInput;
    orderBy?: Prisma.StudentProgressOrderByWithRelationInput | Prisma.StudentProgressOrderByWithRelationInput[];
    cursor?: Prisma.StudentProgressWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StudentProgressScalarFieldEnum | Prisma.StudentProgressScalarFieldEnum[];
};
export type StudentProgressFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProgressSelect<ExtArgs> | null;
    omit?: Prisma.StudentProgressOmit<ExtArgs> | null;
    include?: Prisma.StudentProgressInclude<ExtArgs> | null;
    where?: Prisma.StudentProgressWhereInput;
    orderBy?: Prisma.StudentProgressOrderByWithRelationInput | Prisma.StudentProgressOrderByWithRelationInput[];
    cursor?: Prisma.StudentProgressWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StudentProgressScalarFieldEnum | Prisma.StudentProgressScalarFieldEnum[];
};
export type StudentProgressCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProgressSelect<ExtArgs> | null;
    omit?: Prisma.StudentProgressOmit<ExtArgs> | null;
    include?: Prisma.StudentProgressInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StudentProgressCreateInput, Prisma.StudentProgressUncheckedCreateInput>;
};
export type StudentProgressCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.StudentProgressCreateManyInput | Prisma.StudentProgressCreateManyInput[];
    skipDuplicates?: boolean;
};
export type StudentProgressCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProgressSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StudentProgressOmit<ExtArgs> | null;
    data: Prisma.StudentProgressCreateManyInput | Prisma.StudentProgressCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.StudentProgressIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type StudentProgressUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProgressSelect<ExtArgs> | null;
    omit?: Prisma.StudentProgressOmit<ExtArgs> | null;
    include?: Prisma.StudentProgressInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StudentProgressUpdateInput, Prisma.StudentProgressUncheckedUpdateInput>;
    where: Prisma.StudentProgressWhereUniqueInput;
};
export type StudentProgressUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.StudentProgressUpdateManyMutationInput, Prisma.StudentProgressUncheckedUpdateManyInput>;
    where?: Prisma.StudentProgressWhereInput;
    limit?: number;
};
export type StudentProgressUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProgressSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StudentProgressOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StudentProgressUpdateManyMutationInput, Prisma.StudentProgressUncheckedUpdateManyInput>;
    where?: Prisma.StudentProgressWhereInput;
    limit?: number;
    include?: Prisma.StudentProgressIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type StudentProgressUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProgressSelect<ExtArgs> | null;
    omit?: Prisma.StudentProgressOmit<ExtArgs> | null;
    include?: Prisma.StudentProgressInclude<ExtArgs> | null;
    where: Prisma.StudentProgressWhereUniqueInput;
    create: Prisma.XOR<Prisma.StudentProgressCreateInput, Prisma.StudentProgressUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.StudentProgressUpdateInput, Prisma.StudentProgressUncheckedUpdateInput>;
};
export type StudentProgressDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProgressSelect<ExtArgs> | null;
    omit?: Prisma.StudentProgressOmit<ExtArgs> | null;
    include?: Prisma.StudentProgressInclude<ExtArgs> | null;
    where: Prisma.StudentProgressWhereUniqueInput;
};
export type StudentProgressDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StudentProgressWhereInput;
    limit?: number;
};
export type StudentProgressDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProgressSelect<ExtArgs> | null;
    omit?: Prisma.StudentProgressOmit<ExtArgs> | null;
    include?: Prisma.StudentProgressInclude<ExtArgs> | null;
};
export {};
