import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type LessonModel = runtime.Types.Result.DefaultSelection<Prisma.$LessonPayload>;
export type AggregateLesson = {
    _count: LessonCountAggregateOutputType | null;
    _avg: LessonAvgAggregateOutputType | null;
    _sum: LessonSumAggregateOutputType | null;
    _min: LessonMinAggregateOutputType | null;
    _max: LessonMaxAggregateOutputType | null;
};
export type LessonAvgAggregateOutputType = {
    order: number | null;
};
export type LessonSumAggregateOutputType = {
    order: number | null;
};
export type LessonMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    order: number | null;
    type: $Enums.LessonType | null;
    videoUrl: string | null;
    content: string | null;
    chapterId: string | null;
};
export type LessonMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    order: number | null;
    type: $Enums.LessonType | null;
    videoUrl: string | null;
    content: string | null;
    chapterId: string | null;
};
export type LessonCountAggregateOutputType = {
    id: number;
    title: number;
    order: number;
    type: number;
    videoUrl: number;
    content: number;
    chapterId: number;
    _all: number;
};
export type LessonAvgAggregateInputType = {
    order?: true;
};
export type LessonSumAggregateInputType = {
    order?: true;
};
export type LessonMinAggregateInputType = {
    id?: true;
    title?: true;
    order?: true;
    type?: true;
    videoUrl?: true;
    content?: true;
    chapterId?: true;
};
export type LessonMaxAggregateInputType = {
    id?: true;
    title?: true;
    order?: true;
    type?: true;
    videoUrl?: true;
    content?: true;
    chapterId?: true;
};
export type LessonCountAggregateInputType = {
    id?: true;
    title?: true;
    order?: true;
    type?: true;
    videoUrl?: true;
    content?: true;
    chapterId?: true;
    _all?: true;
};
export type LessonAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LessonWhereInput;
    orderBy?: Prisma.LessonOrderByWithRelationInput | Prisma.LessonOrderByWithRelationInput[];
    cursor?: Prisma.LessonWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | LessonCountAggregateInputType;
    _avg?: LessonAvgAggregateInputType;
    _sum?: LessonSumAggregateInputType;
    _min?: LessonMinAggregateInputType;
    _max?: LessonMaxAggregateInputType;
};
export type GetLessonAggregateType<T extends LessonAggregateArgs> = {
    [P in keyof T & keyof AggregateLesson]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLesson[P]> : Prisma.GetScalarType<T[P], AggregateLesson[P]>;
};
export type LessonGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LessonWhereInput;
    orderBy?: Prisma.LessonOrderByWithAggregationInput | Prisma.LessonOrderByWithAggregationInput[];
    by: Prisma.LessonScalarFieldEnum[] | Prisma.LessonScalarFieldEnum;
    having?: Prisma.LessonScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LessonCountAggregateInputType | true;
    _avg?: LessonAvgAggregateInputType;
    _sum?: LessonSumAggregateInputType;
    _min?: LessonMinAggregateInputType;
    _max?: LessonMaxAggregateInputType;
};
export type LessonGroupByOutputType = {
    id: string;
    title: string;
    order: number;
    type: $Enums.LessonType;
    videoUrl: string | null;
    content: string | null;
    chapterId: string;
    _count: LessonCountAggregateOutputType | null;
    _avg: LessonAvgAggregateOutputType | null;
    _sum: LessonSumAggregateOutputType | null;
    _min: LessonMinAggregateOutputType | null;
    _max: LessonMaxAggregateOutputType | null;
};
type GetLessonGroupByPayload<T extends LessonGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LessonGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LessonGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LessonGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LessonGroupByOutputType[P]>;
}>>;
export type LessonWhereInput = {
    AND?: Prisma.LessonWhereInput | Prisma.LessonWhereInput[];
    OR?: Prisma.LessonWhereInput[];
    NOT?: Prisma.LessonWhereInput | Prisma.LessonWhereInput[];
    id?: Prisma.StringFilter<"Lesson"> | string;
    title?: Prisma.StringFilter<"Lesson"> | string;
    order?: Prisma.IntFilter<"Lesson"> | number;
    type?: Prisma.EnumLessonTypeFilter<"Lesson"> | $Enums.LessonType;
    videoUrl?: Prisma.StringNullableFilter<"Lesson"> | string | null;
    content?: Prisma.StringNullableFilter<"Lesson"> | string | null;
    chapterId?: Prisma.StringFilter<"Lesson"> | string;
    chapter?: Prisma.XOR<Prisma.ChapterScalarRelationFilter, Prisma.ChapterWhereInput>;
    questionSet?: Prisma.XOR<Prisma.QuestionSetNullableScalarRelationFilter, Prisma.QuestionSetWhereInput> | null;
    progress?: Prisma.StudentProgressListRelationFilter;
};
export type LessonOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    videoUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    content?: Prisma.SortOrderInput | Prisma.SortOrder;
    chapterId?: Prisma.SortOrder;
    chapter?: Prisma.ChapterOrderByWithRelationInput;
    questionSet?: Prisma.QuestionSetOrderByWithRelationInput;
    progress?: Prisma.StudentProgressOrderByRelationAggregateInput;
};
export type LessonWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.LessonWhereInput | Prisma.LessonWhereInput[];
    OR?: Prisma.LessonWhereInput[];
    NOT?: Prisma.LessonWhereInput | Prisma.LessonWhereInput[];
    title?: Prisma.StringFilter<"Lesson"> | string;
    order?: Prisma.IntFilter<"Lesson"> | number;
    type?: Prisma.EnumLessonTypeFilter<"Lesson"> | $Enums.LessonType;
    videoUrl?: Prisma.StringNullableFilter<"Lesson"> | string | null;
    content?: Prisma.StringNullableFilter<"Lesson"> | string | null;
    chapterId?: Prisma.StringFilter<"Lesson"> | string;
    chapter?: Prisma.XOR<Prisma.ChapterScalarRelationFilter, Prisma.ChapterWhereInput>;
    questionSet?: Prisma.XOR<Prisma.QuestionSetNullableScalarRelationFilter, Prisma.QuestionSetWhereInput> | null;
    progress?: Prisma.StudentProgressListRelationFilter;
}, "id">;
export type LessonOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    videoUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    content?: Prisma.SortOrderInput | Prisma.SortOrder;
    chapterId?: Prisma.SortOrder;
    _count?: Prisma.LessonCountOrderByAggregateInput;
    _avg?: Prisma.LessonAvgOrderByAggregateInput;
    _max?: Prisma.LessonMaxOrderByAggregateInput;
    _min?: Prisma.LessonMinOrderByAggregateInput;
    _sum?: Prisma.LessonSumOrderByAggregateInput;
};
export type LessonScalarWhereWithAggregatesInput = {
    AND?: Prisma.LessonScalarWhereWithAggregatesInput | Prisma.LessonScalarWhereWithAggregatesInput[];
    OR?: Prisma.LessonScalarWhereWithAggregatesInput[];
    NOT?: Prisma.LessonScalarWhereWithAggregatesInput | Prisma.LessonScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Lesson"> | string;
    title?: Prisma.StringWithAggregatesFilter<"Lesson"> | string;
    order?: Prisma.IntWithAggregatesFilter<"Lesson"> | number;
    type?: Prisma.EnumLessonTypeWithAggregatesFilter<"Lesson"> | $Enums.LessonType;
    videoUrl?: Prisma.StringNullableWithAggregatesFilter<"Lesson"> | string | null;
    content?: Prisma.StringNullableWithAggregatesFilter<"Lesson"> | string | null;
    chapterId?: Prisma.StringWithAggregatesFilter<"Lesson"> | string;
};
export type LessonCreateInput = {
    id?: string;
    title: string;
    order: number;
    type?: $Enums.LessonType;
    videoUrl?: string | null;
    content?: string | null;
    chapter: Prisma.ChapterCreateNestedOneWithoutLessonsInput;
    questionSet?: Prisma.QuestionSetCreateNestedOneWithoutLessonInput;
    progress?: Prisma.StudentProgressCreateNestedManyWithoutLessonInput;
};
export type LessonUncheckedCreateInput = {
    id?: string;
    title: string;
    order: number;
    type?: $Enums.LessonType;
    videoUrl?: string | null;
    content?: string | null;
    chapterId: string;
    questionSet?: Prisma.QuestionSetUncheckedCreateNestedOneWithoutLessonInput;
    progress?: Prisma.StudentProgressUncheckedCreateNestedManyWithoutLessonInput;
};
export type LessonUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumLessonTypeFieldUpdateOperationsInput | $Enums.LessonType;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chapter?: Prisma.ChapterUpdateOneRequiredWithoutLessonsNestedInput;
    questionSet?: Prisma.QuestionSetUpdateOneWithoutLessonNestedInput;
    progress?: Prisma.StudentProgressUpdateManyWithoutLessonNestedInput;
};
export type LessonUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumLessonTypeFieldUpdateOperationsInput | $Enums.LessonType;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chapterId?: Prisma.StringFieldUpdateOperationsInput | string;
    questionSet?: Prisma.QuestionSetUncheckedUpdateOneWithoutLessonNestedInput;
    progress?: Prisma.StudentProgressUncheckedUpdateManyWithoutLessonNestedInput;
};
export type LessonCreateManyInput = {
    id?: string;
    title: string;
    order: number;
    type?: $Enums.LessonType;
    videoUrl?: string | null;
    content?: string | null;
    chapterId: string;
};
export type LessonUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumLessonTypeFieldUpdateOperationsInput | $Enums.LessonType;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type LessonUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumLessonTypeFieldUpdateOperationsInput | $Enums.LessonType;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chapterId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type LessonListRelationFilter = {
    every?: Prisma.LessonWhereInput;
    some?: Prisma.LessonWhereInput;
    none?: Prisma.LessonWhereInput;
};
export type LessonOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type LessonCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    videoUrl?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    chapterId?: Prisma.SortOrder;
};
export type LessonAvgOrderByAggregateInput = {
    order?: Prisma.SortOrder;
};
export type LessonMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    videoUrl?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    chapterId?: Prisma.SortOrder;
};
export type LessonMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    videoUrl?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    chapterId?: Prisma.SortOrder;
};
export type LessonSumOrderByAggregateInput = {
    order?: Prisma.SortOrder;
};
export type LessonScalarRelationFilter = {
    is?: Prisma.LessonWhereInput;
    isNot?: Prisma.LessonWhereInput;
};
export type LessonCreateNestedManyWithoutChapterInput = {
    create?: Prisma.XOR<Prisma.LessonCreateWithoutChapterInput, Prisma.LessonUncheckedCreateWithoutChapterInput> | Prisma.LessonCreateWithoutChapterInput[] | Prisma.LessonUncheckedCreateWithoutChapterInput[];
    connectOrCreate?: Prisma.LessonCreateOrConnectWithoutChapterInput | Prisma.LessonCreateOrConnectWithoutChapterInput[];
    createMany?: Prisma.LessonCreateManyChapterInputEnvelope;
    connect?: Prisma.LessonWhereUniqueInput | Prisma.LessonWhereUniqueInput[];
};
export type LessonUncheckedCreateNestedManyWithoutChapterInput = {
    create?: Prisma.XOR<Prisma.LessonCreateWithoutChapterInput, Prisma.LessonUncheckedCreateWithoutChapterInput> | Prisma.LessonCreateWithoutChapterInput[] | Prisma.LessonUncheckedCreateWithoutChapterInput[];
    connectOrCreate?: Prisma.LessonCreateOrConnectWithoutChapterInput | Prisma.LessonCreateOrConnectWithoutChapterInput[];
    createMany?: Prisma.LessonCreateManyChapterInputEnvelope;
    connect?: Prisma.LessonWhereUniqueInput | Prisma.LessonWhereUniqueInput[];
};
export type LessonUpdateManyWithoutChapterNestedInput = {
    create?: Prisma.XOR<Prisma.LessonCreateWithoutChapterInput, Prisma.LessonUncheckedCreateWithoutChapterInput> | Prisma.LessonCreateWithoutChapterInput[] | Prisma.LessonUncheckedCreateWithoutChapterInput[];
    connectOrCreate?: Prisma.LessonCreateOrConnectWithoutChapterInput | Prisma.LessonCreateOrConnectWithoutChapterInput[];
    upsert?: Prisma.LessonUpsertWithWhereUniqueWithoutChapterInput | Prisma.LessonUpsertWithWhereUniqueWithoutChapterInput[];
    createMany?: Prisma.LessonCreateManyChapterInputEnvelope;
    set?: Prisma.LessonWhereUniqueInput | Prisma.LessonWhereUniqueInput[];
    disconnect?: Prisma.LessonWhereUniqueInput | Prisma.LessonWhereUniqueInput[];
    delete?: Prisma.LessonWhereUniqueInput | Prisma.LessonWhereUniqueInput[];
    connect?: Prisma.LessonWhereUniqueInput | Prisma.LessonWhereUniqueInput[];
    update?: Prisma.LessonUpdateWithWhereUniqueWithoutChapterInput | Prisma.LessonUpdateWithWhereUniqueWithoutChapterInput[];
    updateMany?: Prisma.LessonUpdateManyWithWhereWithoutChapterInput | Prisma.LessonUpdateManyWithWhereWithoutChapterInput[];
    deleteMany?: Prisma.LessonScalarWhereInput | Prisma.LessonScalarWhereInput[];
};
export type LessonUncheckedUpdateManyWithoutChapterNestedInput = {
    create?: Prisma.XOR<Prisma.LessonCreateWithoutChapterInput, Prisma.LessonUncheckedCreateWithoutChapterInput> | Prisma.LessonCreateWithoutChapterInput[] | Prisma.LessonUncheckedCreateWithoutChapterInput[];
    connectOrCreate?: Prisma.LessonCreateOrConnectWithoutChapterInput | Prisma.LessonCreateOrConnectWithoutChapterInput[];
    upsert?: Prisma.LessonUpsertWithWhereUniqueWithoutChapterInput | Prisma.LessonUpsertWithWhereUniqueWithoutChapterInput[];
    createMany?: Prisma.LessonCreateManyChapterInputEnvelope;
    set?: Prisma.LessonWhereUniqueInput | Prisma.LessonWhereUniqueInput[];
    disconnect?: Prisma.LessonWhereUniqueInput | Prisma.LessonWhereUniqueInput[];
    delete?: Prisma.LessonWhereUniqueInput | Prisma.LessonWhereUniqueInput[];
    connect?: Prisma.LessonWhereUniqueInput | Prisma.LessonWhereUniqueInput[];
    update?: Prisma.LessonUpdateWithWhereUniqueWithoutChapterInput | Prisma.LessonUpdateWithWhereUniqueWithoutChapterInput[];
    updateMany?: Prisma.LessonUpdateManyWithWhereWithoutChapterInput | Prisma.LessonUpdateManyWithWhereWithoutChapterInput[];
    deleteMany?: Prisma.LessonScalarWhereInput | Prisma.LessonScalarWhereInput[];
};
export type EnumLessonTypeFieldUpdateOperationsInput = {
    set?: $Enums.LessonType;
};
export type LessonCreateNestedOneWithoutQuestionSetInput = {
    create?: Prisma.XOR<Prisma.LessonCreateWithoutQuestionSetInput, Prisma.LessonUncheckedCreateWithoutQuestionSetInput>;
    connectOrCreate?: Prisma.LessonCreateOrConnectWithoutQuestionSetInput;
    connect?: Prisma.LessonWhereUniqueInput;
};
export type LessonUpdateOneRequiredWithoutQuestionSetNestedInput = {
    create?: Prisma.XOR<Prisma.LessonCreateWithoutQuestionSetInput, Prisma.LessonUncheckedCreateWithoutQuestionSetInput>;
    connectOrCreate?: Prisma.LessonCreateOrConnectWithoutQuestionSetInput;
    upsert?: Prisma.LessonUpsertWithoutQuestionSetInput;
    connect?: Prisma.LessonWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.LessonUpdateToOneWithWhereWithoutQuestionSetInput, Prisma.LessonUpdateWithoutQuestionSetInput>, Prisma.LessonUncheckedUpdateWithoutQuestionSetInput>;
};
export type LessonCreateNestedOneWithoutProgressInput = {
    create?: Prisma.XOR<Prisma.LessonCreateWithoutProgressInput, Prisma.LessonUncheckedCreateWithoutProgressInput>;
    connectOrCreate?: Prisma.LessonCreateOrConnectWithoutProgressInput;
    connect?: Prisma.LessonWhereUniqueInput;
};
export type LessonUpdateOneRequiredWithoutProgressNestedInput = {
    create?: Prisma.XOR<Prisma.LessonCreateWithoutProgressInput, Prisma.LessonUncheckedCreateWithoutProgressInput>;
    connectOrCreate?: Prisma.LessonCreateOrConnectWithoutProgressInput;
    upsert?: Prisma.LessonUpsertWithoutProgressInput;
    connect?: Prisma.LessonWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.LessonUpdateToOneWithWhereWithoutProgressInput, Prisma.LessonUpdateWithoutProgressInput>, Prisma.LessonUncheckedUpdateWithoutProgressInput>;
};
export type LessonCreateWithoutChapterInput = {
    id?: string;
    title: string;
    order: number;
    type?: $Enums.LessonType;
    videoUrl?: string | null;
    content?: string | null;
    questionSet?: Prisma.QuestionSetCreateNestedOneWithoutLessonInput;
    progress?: Prisma.StudentProgressCreateNestedManyWithoutLessonInput;
};
export type LessonUncheckedCreateWithoutChapterInput = {
    id?: string;
    title: string;
    order: number;
    type?: $Enums.LessonType;
    videoUrl?: string | null;
    content?: string | null;
    questionSet?: Prisma.QuestionSetUncheckedCreateNestedOneWithoutLessonInput;
    progress?: Prisma.StudentProgressUncheckedCreateNestedManyWithoutLessonInput;
};
export type LessonCreateOrConnectWithoutChapterInput = {
    where: Prisma.LessonWhereUniqueInput;
    create: Prisma.XOR<Prisma.LessonCreateWithoutChapterInput, Prisma.LessonUncheckedCreateWithoutChapterInput>;
};
export type LessonCreateManyChapterInputEnvelope = {
    data: Prisma.LessonCreateManyChapterInput | Prisma.LessonCreateManyChapterInput[];
    skipDuplicates?: boolean;
};
export type LessonUpsertWithWhereUniqueWithoutChapterInput = {
    where: Prisma.LessonWhereUniqueInput;
    update: Prisma.XOR<Prisma.LessonUpdateWithoutChapterInput, Prisma.LessonUncheckedUpdateWithoutChapterInput>;
    create: Prisma.XOR<Prisma.LessonCreateWithoutChapterInput, Prisma.LessonUncheckedCreateWithoutChapterInput>;
};
export type LessonUpdateWithWhereUniqueWithoutChapterInput = {
    where: Prisma.LessonWhereUniqueInput;
    data: Prisma.XOR<Prisma.LessonUpdateWithoutChapterInput, Prisma.LessonUncheckedUpdateWithoutChapterInput>;
};
export type LessonUpdateManyWithWhereWithoutChapterInput = {
    where: Prisma.LessonScalarWhereInput;
    data: Prisma.XOR<Prisma.LessonUpdateManyMutationInput, Prisma.LessonUncheckedUpdateManyWithoutChapterInput>;
};
export type LessonScalarWhereInput = {
    AND?: Prisma.LessonScalarWhereInput | Prisma.LessonScalarWhereInput[];
    OR?: Prisma.LessonScalarWhereInput[];
    NOT?: Prisma.LessonScalarWhereInput | Prisma.LessonScalarWhereInput[];
    id?: Prisma.StringFilter<"Lesson"> | string;
    title?: Prisma.StringFilter<"Lesson"> | string;
    order?: Prisma.IntFilter<"Lesson"> | number;
    type?: Prisma.EnumLessonTypeFilter<"Lesson"> | $Enums.LessonType;
    videoUrl?: Prisma.StringNullableFilter<"Lesson"> | string | null;
    content?: Prisma.StringNullableFilter<"Lesson"> | string | null;
    chapterId?: Prisma.StringFilter<"Lesson"> | string;
};
export type LessonCreateWithoutQuestionSetInput = {
    id?: string;
    title: string;
    order: number;
    type?: $Enums.LessonType;
    videoUrl?: string | null;
    content?: string | null;
    chapter: Prisma.ChapterCreateNestedOneWithoutLessonsInput;
    progress?: Prisma.StudentProgressCreateNestedManyWithoutLessonInput;
};
export type LessonUncheckedCreateWithoutQuestionSetInput = {
    id?: string;
    title: string;
    order: number;
    type?: $Enums.LessonType;
    videoUrl?: string | null;
    content?: string | null;
    chapterId: string;
    progress?: Prisma.StudentProgressUncheckedCreateNestedManyWithoutLessonInput;
};
export type LessonCreateOrConnectWithoutQuestionSetInput = {
    where: Prisma.LessonWhereUniqueInput;
    create: Prisma.XOR<Prisma.LessonCreateWithoutQuestionSetInput, Prisma.LessonUncheckedCreateWithoutQuestionSetInput>;
};
export type LessonUpsertWithoutQuestionSetInput = {
    update: Prisma.XOR<Prisma.LessonUpdateWithoutQuestionSetInput, Prisma.LessonUncheckedUpdateWithoutQuestionSetInput>;
    create: Prisma.XOR<Prisma.LessonCreateWithoutQuestionSetInput, Prisma.LessonUncheckedCreateWithoutQuestionSetInput>;
    where?: Prisma.LessonWhereInput;
};
export type LessonUpdateToOneWithWhereWithoutQuestionSetInput = {
    where?: Prisma.LessonWhereInput;
    data: Prisma.XOR<Prisma.LessonUpdateWithoutQuestionSetInput, Prisma.LessonUncheckedUpdateWithoutQuestionSetInput>;
};
export type LessonUpdateWithoutQuestionSetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumLessonTypeFieldUpdateOperationsInput | $Enums.LessonType;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chapter?: Prisma.ChapterUpdateOneRequiredWithoutLessonsNestedInput;
    progress?: Prisma.StudentProgressUpdateManyWithoutLessonNestedInput;
};
export type LessonUncheckedUpdateWithoutQuestionSetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumLessonTypeFieldUpdateOperationsInput | $Enums.LessonType;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chapterId?: Prisma.StringFieldUpdateOperationsInput | string;
    progress?: Prisma.StudentProgressUncheckedUpdateManyWithoutLessonNestedInput;
};
export type LessonCreateWithoutProgressInput = {
    id?: string;
    title: string;
    order: number;
    type?: $Enums.LessonType;
    videoUrl?: string | null;
    content?: string | null;
    chapter: Prisma.ChapterCreateNestedOneWithoutLessonsInput;
    questionSet?: Prisma.QuestionSetCreateNestedOneWithoutLessonInput;
};
export type LessonUncheckedCreateWithoutProgressInput = {
    id?: string;
    title: string;
    order: number;
    type?: $Enums.LessonType;
    videoUrl?: string | null;
    content?: string | null;
    chapterId: string;
    questionSet?: Prisma.QuestionSetUncheckedCreateNestedOneWithoutLessonInput;
};
export type LessonCreateOrConnectWithoutProgressInput = {
    where: Prisma.LessonWhereUniqueInput;
    create: Prisma.XOR<Prisma.LessonCreateWithoutProgressInput, Prisma.LessonUncheckedCreateWithoutProgressInput>;
};
export type LessonUpsertWithoutProgressInput = {
    update: Prisma.XOR<Prisma.LessonUpdateWithoutProgressInput, Prisma.LessonUncheckedUpdateWithoutProgressInput>;
    create: Prisma.XOR<Prisma.LessonCreateWithoutProgressInput, Prisma.LessonUncheckedCreateWithoutProgressInput>;
    where?: Prisma.LessonWhereInput;
};
export type LessonUpdateToOneWithWhereWithoutProgressInput = {
    where?: Prisma.LessonWhereInput;
    data: Prisma.XOR<Prisma.LessonUpdateWithoutProgressInput, Prisma.LessonUncheckedUpdateWithoutProgressInput>;
};
export type LessonUpdateWithoutProgressInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumLessonTypeFieldUpdateOperationsInput | $Enums.LessonType;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chapter?: Prisma.ChapterUpdateOneRequiredWithoutLessonsNestedInput;
    questionSet?: Prisma.QuestionSetUpdateOneWithoutLessonNestedInput;
};
export type LessonUncheckedUpdateWithoutProgressInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumLessonTypeFieldUpdateOperationsInput | $Enums.LessonType;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    chapterId?: Prisma.StringFieldUpdateOperationsInput | string;
    questionSet?: Prisma.QuestionSetUncheckedUpdateOneWithoutLessonNestedInput;
};
export type LessonCreateManyChapterInput = {
    id?: string;
    title: string;
    order: number;
    type?: $Enums.LessonType;
    videoUrl?: string | null;
    content?: string | null;
};
export type LessonUpdateWithoutChapterInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumLessonTypeFieldUpdateOperationsInput | $Enums.LessonType;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    questionSet?: Prisma.QuestionSetUpdateOneWithoutLessonNestedInput;
    progress?: Prisma.StudentProgressUpdateManyWithoutLessonNestedInput;
};
export type LessonUncheckedUpdateWithoutChapterInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumLessonTypeFieldUpdateOperationsInput | $Enums.LessonType;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    questionSet?: Prisma.QuestionSetUncheckedUpdateOneWithoutLessonNestedInput;
    progress?: Prisma.StudentProgressUncheckedUpdateManyWithoutLessonNestedInput;
};
export type LessonUncheckedUpdateManyWithoutChapterInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumLessonTypeFieldUpdateOperationsInput | $Enums.LessonType;
    videoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type LessonCountOutputType = {
    progress: number;
};
export type LessonCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    progress?: boolean | LessonCountOutputTypeCountProgressArgs;
};
export type LessonCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonCountOutputTypeSelect<ExtArgs> | null;
};
export type LessonCountOutputTypeCountProgressArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StudentProgressWhereInput;
};
export type LessonSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    order?: boolean;
    type?: boolean;
    videoUrl?: boolean;
    content?: boolean;
    chapterId?: boolean;
    chapter?: boolean | Prisma.ChapterDefaultArgs<ExtArgs>;
    questionSet?: boolean | Prisma.Lesson$questionSetArgs<ExtArgs>;
    progress?: boolean | Prisma.Lesson$progressArgs<ExtArgs>;
    _count?: boolean | Prisma.LessonCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["lesson"]>;
export type LessonSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    order?: boolean;
    type?: boolean;
    videoUrl?: boolean;
    content?: boolean;
    chapterId?: boolean;
    chapter?: boolean | Prisma.ChapterDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["lesson"]>;
export type LessonSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    order?: boolean;
    type?: boolean;
    videoUrl?: boolean;
    content?: boolean;
    chapterId?: boolean;
    chapter?: boolean | Prisma.ChapterDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["lesson"]>;
export type LessonSelectScalar = {
    id?: boolean;
    title?: boolean;
    order?: boolean;
    type?: boolean;
    videoUrl?: boolean;
    content?: boolean;
    chapterId?: boolean;
};
export type LessonOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "order" | "type" | "videoUrl" | "content" | "chapterId", ExtArgs["result"]["lesson"]>;
export type LessonInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    chapter?: boolean | Prisma.ChapterDefaultArgs<ExtArgs>;
    questionSet?: boolean | Prisma.Lesson$questionSetArgs<ExtArgs>;
    progress?: boolean | Prisma.Lesson$progressArgs<ExtArgs>;
    _count?: boolean | Prisma.LessonCountOutputTypeDefaultArgs<ExtArgs>;
};
export type LessonIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    chapter?: boolean | Prisma.ChapterDefaultArgs<ExtArgs>;
};
export type LessonIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    chapter?: boolean | Prisma.ChapterDefaultArgs<ExtArgs>;
};
export type $LessonPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Lesson";
    objects: {
        chapter: Prisma.$ChapterPayload<ExtArgs>;
        questionSet: Prisma.$QuestionSetPayload<ExtArgs> | null;
        progress: Prisma.$StudentProgressPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        title: string;
        order: number;
        type: $Enums.LessonType;
        videoUrl: string | null;
        content: string | null;
        chapterId: string;
    }, ExtArgs["result"]["lesson"]>;
    composites: {};
};
export type LessonGetPayload<S extends boolean | null | undefined | LessonDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LessonPayload, S>;
export type LessonCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<LessonFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LessonCountAggregateInputType | true;
};
export interface LessonDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Lesson'];
        meta: {
            name: 'Lesson';
        };
    };
    findUnique<T extends LessonFindUniqueArgs>(args: Prisma.SelectSubset<T, LessonFindUniqueArgs<ExtArgs>>): Prisma.Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends LessonFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, LessonFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends LessonFindFirstArgs>(args?: Prisma.SelectSubset<T, LessonFindFirstArgs<ExtArgs>>): Prisma.Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends LessonFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, LessonFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends LessonFindManyArgs>(args?: Prisma.SelectSubset<T, LessonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends LessonCreateArgs>(args: Prisma.SelectSubset<T, LessonCreateArgs<ExtArgs>>): Prisma.Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends LessonCreateManyArgs>(args?: Prisma.SelectSubset<T, LessonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends LessonCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, LessonCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends LessonDeleteArgs>(args: Prisma.SelectSubset<T, LessonDeleteArgs<ExtArgs>>): Prisma.Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends LessonUpdateArgs>(args: Prisma.SelectSubset<T, LessonUpdateArgs<ExtArgs>>): Prisma.Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends LessonDeleteManyArgs>(args?: Prisma.SelectSubset<T, LessonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends LessonUpdateManyArgs>(args: Prisma.SelectSubset<T, LessonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends LessonUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, LessonUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends LessonUpsertArgs>(args: Prisma.SelectSubset<T, LessonUpsertArgs<ExtArgs>>): Prisma.Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends LessonCountArgs>(args?: Prisma.Subset<T, LessonCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LessonCountAggregateOutputType> : number>;
    aggregate<T extends LessonAggregateArgs>(args: Prisma.Subset<T, LessonAggregateArgs>): Prisma.PrismaPromise<GetLessonAggregateType<T>>;
    groupBy<T extends LessonGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: LessonGroupByArgs['orderBy'];
    } : {
        orderBy?: LessonGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, LessonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLessonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: LessonFieldRefs;
}
export interface Prisma__LessonClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    chapter<T extends Prisma.ChapterDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ChapterDefaultArgs<ExtArgs>>): Prisma.Prisma__ChapterClient<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    questionSet<T extends Prisma.Lesson$questionSetArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Lesson$questionSetArgs<ExtArgs>>): Prisma.Prisma__QuestionSetClient<runtime.Types.Result.GetResult<Prisma.$QuestionSetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    progress<T extends Prisma.Lesson$progressArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Lesson$progressArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudentProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface LessonFieldRefs {
    readonly id: Prisma.FieldRef<"Lesson", 'String'>;
    readonly title: Prisma.FieldRef<"Lesson", 'String'>;
    readonly order: Prisma.FieldRef<"Lesson", 'Int'>;
    readonly type: Prisma.FieldRef<"Lesson", 'LessonType'>;
    readonly videoUrl: Prisma.FieldRef<"Lesson", 'String'>;
    readonly content: Prisma.FieldRef<"Lesson", 'String'>;
    readonly chapterId: Prisma.FieldRef<"Lesson", 'String'>;
}
export type LessonFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonSelect<ExtArgs> | null;
    omit?: Prisma.LessonOmit<ExtArgs> | null;
    include?: Prisma.LessonInclude<ExtArgs> | null;
    where: Prisma.LessonWhereUniqueInput;
};
export type LessonFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonSelect<ExtArgs> | null;
    omit?: Prisma.LessonOmit<ExtArgs> | null;
    include?: Prisma.LessonInclude<ExtArgs> | null;
    where: Prisma.LessonWhereUniqueInput;
};
export type LessonFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonSelect<ExtArgs> | null;
    omit?: Prisma.LessonOmit<ExtArgs> | null;
    include?: Prisma.LessonInclude<ExtArgs> | null;
    where?: Prisma.LessonWhereInput;
    orderBy?: Prisma.LessonOrderByWithRelationInput | Prisma.LessonOrderByWithRelationInput[];
    cursor?: Prisma.LessonWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LessonScalarFieldEnum | Prisma.LessonScalarFieldEnum[];
};
export type LessonFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonSelect<ExtArgs> | null;
    omit?: Prisma.LessonOmit<ExtArgs> | null;
    include?: Prisma.LessonInclude<ExtArgs> | null;
    where?: Prisma.LessonWhereInput;
    orderBy?: Prisma.LessonOrderByWithRelationInput | Prisma.LessonOrderByWithRelationInput[];
    cursor?: Prisma.LessonWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LessonScalarFieldEnum | Prisma.LessonScalarFieldEnum[];
};
export type LessonFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonSelect<ExtArgs> | null;
    omit?: Prisma.LessonOmit<ExtArgs> | null;
    include?: Prisma.LessonInclude<ExtArgs> | null;
    where?: Prisma.LessonWhereInput;
    orderBy?: Prisma.LessonOrderByWithRelationInput | Prisma.LessonOrderByWithRelationInput[];
    cursor?: Prisma.LessonWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LessonScalarFieldEnum | Prisma.LessonScalarFieldEnum[];
};
export type LessonCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonSelect<ExtArgs> | null;
    omit?: Prisma.LessonOmit<ExtArgs> | null;
    include?: Prisma.LessonInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LessonCreateInput, Prisma.LessonUncheckedCreateInput>;
};
export type LessonCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.LessonCreateManyInput | Prisma.LessonCreateManyInput[];
    skipDuplicates?: boolean;
};
export type LessonCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LessonOmit<ExtArgs> | null;
    data: Prisma.LessonCreateManyInput | Prisma.LessonCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.LessonIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type LessonUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonSelect<ExtArgs> | null;
    omit?: Prisma.LessonOmit<ExtArgs> | null;
    include?: Prisma.LessonInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LessonUpdateInput, Prisma.LessonUncheckedUpdateInput>;
    where: Prisma.LessonWhereUniqueInput;
};
export type LessonUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.LessonUpdateManyMutationInput, Prisma.LessonUncheckedUpdateManyInput>;
    where?: Prisma.LessonWhereInput;
    limit?: number;
};
export type LessonUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LessonOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LessonUpdateManyMutationInput, Prisma.LessonUncheckedUpdateManyInput>;
    where?: Prisma.LessonWhereInput;
    limit?: number;
    include?: Prisma.LessonIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type LessonUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonSelect<ExtArgs> | null;
    omit?: Prisma.LessonOmit<ExtArgs> | null;
    include?: Prisma.LessonInclude<ExtArgs> | null;
    where: Prisma.LessonWhereUniqueInput;
    create: Prisma.XOR<Prisma.LessonCreateInput, Prisma.LessonUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.LessonUpdateInput, Prisma.LessonUncheckedUpdateInput>;
};
export type LessonDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonSelect<ExtArgs> | null;
    omit?: Prisma.LessonOmit<ExtArgs> | null;
    include?: Prisma.LessonInclude<ExtArgs> | null;
    where: Prisma.LessonWhereUniqueInput;
};
export type LessonDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LessonWhereInput;
    limit?: number;
};
export type Lesson$questionSetArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.QuestionSetSelect<ExtArgs> | null;
    omit?: Prisma.QuestionSetOmit<ExtArgs> | null;
    include?: Prisma.QuestionSetInclude<ExtArgs> | null;
    where?: Prisma.QuestionSetWhereInput;
};
export type Lesson$progressArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type LessonDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonSelect<ExtArgs> | null;
    omit?: Prisma.LessonOmit<ExtArgs> | null;
    include?: Prisma.LessonInclude<ExtArgs> | null;
};
export {};
